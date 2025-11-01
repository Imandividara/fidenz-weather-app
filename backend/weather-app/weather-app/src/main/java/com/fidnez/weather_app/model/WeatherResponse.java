package com.fidnez.weather_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {
    private String name;
    private Main main;
    private List<Weather> weather;
    private Wind wind;
    private Clouds clouds;
    private Sys sys;
    private int visibility;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Main {
        private double temp;
        private double temp_min;
        private double temp_max;
        private int pressure;
        private int humidity;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Weather {
        private String main;
        private String description;
        private String icon;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Wind {
        private double speed;
        private int deg;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Clouds {
        private int all;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Sys {
        private long sunrise;
        private long sunset;
    }
}