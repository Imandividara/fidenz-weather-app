package com.fidnez.weather_app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fidnez.weather_app.dto.WeatherDTO;
import com.fidnez.weather_app.model.CityData;
import com.fidnez.weather_app.model.WeatherResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class WeatherService {

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public WeatherService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public List<String> loadCityCodes() throws IOException {
        ClassPathResource resource = new ClassPathResource("cities.json");
        JsonNode rootNode = objectMapper.readTree(resource.getInputStream());
        JsonNode listNode = rootNode.get("List");

        List<CityData> cities = objectMapper.convertValue(
                listNode,
                new TypeReference<List<CityData>>() {}
        );

        List<String> cityCodes = new ArrayList<>();
        for (CityData city : cities) {
            cityCodes.add(city.getCityCode());
        }

        return cityCodes;
    }

    @Cacheable(value = "weatherCache", key = "#cityCode")
    public WeatherDTO getWeatherByCityCode(String cityCode) {
        String url = String.format("%s?id=%s&appid=%s&units=metric",
                apiUrl, cityCode, apiKey);

        try {
            WeatherResponse response = restTemplate.getForObject(url, WeatherResponse.class);

            if (response != null) {
                return WeatherDTO.builder()
                        .cityName(response.getName())
                        .cityCode(cityCode)
                        .temperature(response.getMain().getTemp())
                        .tempMin(response.getMain().getTemp_min())
                        .tempMax(response.getMain().getTemp_max())
                        .description(response.getWeather().get(0).getDescription())
                        .condition(response.getWeather().get(0).getMain())
                        .humidity(response.getMain().getHumidity())
                        .pressure(response.getMain().getPressure())
                        .visibility(response.getVisibility() / 1000.0)
                        .windSpeed(response.getWind().getSpeed())
                        .windDegree(response.getWind().getDeg())
                        .sunrise(response.getSys().getSunrise())
                        .sunset(response.getSys().getSunset())
                        .build();
            }
        } catch (Exception e) {
            log.error("Error fetching weather for city code: {}", cityCode, e);
        }

        return null;
    }

    public List<WeatherDTO> getAllWeatherData() throws IOException {
        log.info("Fetching weather data for all cities");
        List<String> cityCodes = loadCityCodes();
        log.info("Loaded {} city codes", cityCodes.size());

        List<WeatherDTO> weatherList = new ArrayList<>();

        for (String cityCode : cityCodes) {
            WeatherDTO weather = getWeatherByCityCode(cityCode);
            if (weather != null) {
                weatherList.add(weather);
                log.info("Successfully fetched weather for city: {}", weather.getCityName());
            } else {
                log.warn("Failed to fetch weather for city code: {}", cityCode);
            }
        }

        log.info("Total weather data fetched: {}", weatherList.size());
        return weatherList;
    }
}
