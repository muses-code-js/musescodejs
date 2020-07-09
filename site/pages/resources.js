/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_RESOURCES } from '../graphql/resources'

import ResourceItem from '../components/ResourcesItems/ResourceItem';
import SearchBar from '../components/SearchBar';
import { Container, Loading, H2, H3 } from '../primitives';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { colors, gridSize } from '../theme';

 
function Resources(){
    const { data, loading, error } = useQuery(GET_ALL_RESOURCES);
    
    if (error) {
        console.error('Failed to load resources', error);
    }

    return (
       <>
           <Meta title="Events" />
           <Navbar background="white" />
           <Container css={{ marginTop: gridSize * 3 }}>
                <div css={{ display: 'flex', justifyContent: 'space-between'}}>
                    <H2 hasSeparator css={{color: `${colors.pink}`, marginBottom: `${gridSize *7}px`}}>Resources</H2>
                    <SearchBar placeholder="Search Here"  />
                </div>
            {loading ? (
                <Loading isCentered size="xlarge" />
            ) : error ? (
                <p>Something went wrong. Please try again.</p>
            ) : (
                    <ResourceItem resources={data.allResources} />
            )}

           </Container>
           <Footer /> 
       </>
     
   );
}
 
export default Resources;
