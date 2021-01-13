/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Button, Input } from '../primitives/forms';
import { colors } from '../theme';

const SearchBar = ({ placeholder }) => {
  return (
    <form css={{ position: 'relative', height: '100%' }}>
      <Input
        css={{
          width: '250px',
          borderRadius: '40px',
        }}
        placeholder={placeholder}
      />
      <Button
        css={{
          width: '90px',
          backgroundColor: `${colors.blue}`,
          borderRadius: '40px',
          position: 'absolute',
          right: 0,
          top: '1px',
        }}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
