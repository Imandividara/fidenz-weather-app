package com.fidnez.weather_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeatherDTO {
    private String cityName;
    private String cityCode;
    private double temperature;
    private double tempMin;
    private double tempMax;
    private String description;
    private String condition;
    private int humidity;
    private int pressure;
    private double visibility;
    private double windSpeed;
    private int windDegree;
    private long sunrise;
    private long sunset;
}
