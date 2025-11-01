package com.fidnez.weather_app.controller;

import com.fidnez.weather_app.dto.WeatherDTO;
import com.fidnez.weather_app.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed.origins}")
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping
    public ResponseEntity<List<WeatherDTO>> getAllWeather() {
        try {
            List<WeatherDTO> weatherData = weatherService.getAllWeatherData();
            return ResponseEntity.ok(weatherData);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{cityCode}")
    public ResponseEntity<WeatherDTO> getWeatherByCity(@PathVariable String cityCode) {
        WeatherDTO weather = weatherService.getWeatherByCityCode(cityCode);
        if (weather != null) {
            return ResponseEntity.ok(weather);
        }
        return ResponseEntity.notFound().build();
    }
}