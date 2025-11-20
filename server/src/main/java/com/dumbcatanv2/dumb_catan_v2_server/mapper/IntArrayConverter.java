package com.dumbcatanv2.dumb_catan_v2_server.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

public class IntArrayConverter implements AttributeConverter<int[], String> {
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(int[] attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert int[] to JSON", e);
        }
    }

    @Override
    public int[] convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, int[].class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert JSON to int[]", e);
        }
    }
}
