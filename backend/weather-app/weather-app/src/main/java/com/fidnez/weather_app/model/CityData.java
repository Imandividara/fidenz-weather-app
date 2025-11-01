package com.fidnez.weather_app.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CityData {
    @JsonProperty("CityCode")
    private String cityCode;

    @JsonProperty("CityName")
    private String cityName;

    @JsonProperty("Temp")
    private String temp;

    @JsonProperty("Status")
    private String status;
}
