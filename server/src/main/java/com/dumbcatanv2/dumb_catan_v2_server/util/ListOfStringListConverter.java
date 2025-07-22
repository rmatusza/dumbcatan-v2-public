package com.dumbcatanv2.dumb_catan_v2_server.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

import java.util.List;

public class ListOfStringListConverter implements AttributeConverter<List<List<String>>, String> {
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<List<String>> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert List<List<String>> to JSON", e);
        }
    }

    @Override
    public List<List<String>> convertToEntityAttribute(String dbData) {
        try {
            return mapper.readValue(dbData, new TypeReference<List<List<String>>>() {});
        }catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert JSON to list", e);
        }
    }
}
