import React, { useState } from 'react';
import { format } from 'date-fns';
import { ListItem, ListItemAvatar, Avatar, Stack } from '@mui/material';
import { Review } from '@/types/global';
import shortenText from '@/utils/shortenText';

const ItemReview: React.FC<{ review: Review }> = ({ review }) => {
  const [readMore, setReadMore] = useState(false);
  const maxContent = 400;

  const content = shortenText({ maxLen: maxContent, text: review.content });

  const readMoreHandler = () => {
    setReadMore((prev) => !prev);
  };

  return (
    <>
      <ListItem key={review.id} sx={{ width: '100%', maxWidth: '1300px' }}>
        <ListItemAvatar>
          <Avatar
            alt={review.author}
            src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
          />
        </ListItemAvatar>
        <Stack spacing={1}>
          <Stack>
            <h3 className="font-bold text-lg">
              {review.author_details.name || review.author_details.username}
            </h3>
            <p className="font-light">
              Written by {review.author} on{' '}
              {format(new Date(review.created_at), 'MMMM d, yyyy')}
            </p>
          </Stack>
          <p>{readMore ? review.content : content}</p>
          <button
            type="button"
            onClick={readMoreHandler}
            className="text-end font-light text-sm cursor-pointer text-blue-400 hover:text-blue-500"
          >
            {content.length < maxContent
              ? ''
              : readMore
              ? 'Less'
              : 'Read more'}
          </button>
        </Stack>
      </ListItem>
    </>
  );
};

export default ItemReview;
