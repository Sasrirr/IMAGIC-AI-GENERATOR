import React from "react";
import styled from "styled-components";
import { placeholderImages, placeholderIcons } from "../assets/placeholders";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 60px 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const EmptyImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 16px;
  opacity: 0.6;
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const EmptySubtitle = styled.p`
  font-size: 16px;
  opacity: 0.8;
  margin: 0;
  max-width: 400px;
  line-height: 1.5;
`;

const EmptyIcon = styled.div`
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 10px;
`;

const EmptyGalleryState = ({ isSearch, searchTerm }) => {
    if (isSearch) {
        return (
            <EmptyContainer>
                <EmptyIcon>{placeholderIcons.searchIcon}</EmptyIcon>
                <EmptyTitle>No Results Found</EmptyTitle>
                <EmptySubtitle>
                    No images found for "{searchTerm}". Try searching with different keywords like "sunset", "abstract", or "nature".
                </EmptySubtitle>
            </EmptyContainer>
        );
    }

    return (
        <EmptyContainer>
            <EmptyImage src={placeholderImages.default} />
            <EmptyIcon>{placeholderIcons.imageIcon}</EmptyIcon>
            <EmptyTitle>Welcome to the Community Gallery!</EmptyTitle>
            <EmptySubtitle>
                No images have been shared yet. Be the first to create and share an amazing AI-generated image with the community!
            </EmptySubtitle>
        </EmptyContainer>
    );
};

export default EmptyGalleryState;