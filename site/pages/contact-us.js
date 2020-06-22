/** @jsx jsx */
import { jsx } from '@emotion/core';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';

import { gridSize } from '../theme';

import { Container, H2} from '../primitives';

const ContactUs =  () => {
    return (
        <>
            <Meta
            title="Contact Us"
            description="Here you can contact us and subscribe to our mailing list."
            />
            <Navbar />
            <Container css={{ marginTop: gridSize * 3 }}>
                <H2 hasSeparator>Contact Us</H2>
                                              

            </ Container>

            <Footer />
        </>
    );
};

export default ContactUs;