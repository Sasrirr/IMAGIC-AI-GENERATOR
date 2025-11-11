import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { placeholderImages, placeholderIcons } from "../../assets/placeholders";

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow + 90};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
  min-height: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black + 50};
  border-radius: 18px;
  object-fit: cover;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0.7;
`;

const PlaceholderText = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

const PlaceholderSubtext = styled.div`
  font-size: 14px;
  opacity: 0.8;
  text-align: center;
`;

const PlaceholderPreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  opacity: 0.6;
  margin-bottom: 8px;
`;

const GeneratedImageCard = ({ src, loading, prompt = "" }) => {
  // Generate placeholder based on current prompt
  const placeholderSrc = placeholderImages.generatePlaceholder(prompt);
  
  // Debug logging
  console.log("GeneratedImageCard props:", { src, loading, prompt, placeholderSrc });

  return (
    <Container>
      {loading ? (
        <PlaceholderContainer>
          <CircularProgress
            sx={{ color: "inherit", width: "32px", height: "32px" }}
          />
          <PlaceholderText>Generating Your Image</PlaceholderText>
          <PlaceholderSubtext>Creating magic from your prompt...</PlaceholderSubtext>
        </PlaceholderContainer>
      ) : src ? (
        <Image src={src} />
      ) : (
        <PlaceholderContainer>
          <PlaceholderPreview src={placeholderSrc} alt="Preview placeholder" />
          {placeholderIcons.sparklesIcon}
          <PlaceholderText>Write a prompt to generate image</PlaceholderText>
          <PlaceholderSubtext>
            {prompt ? `Preview for: "${prompt.slice(0, 30)}${prompt.length > 30 ? '...' : ''}"` : 'Your generated image will appear here'}
          </PlaceholderSubtext>
        </PlaceholderContainer>
      )}
    </Container>
  );
};

export default GeneratedImageCard;
