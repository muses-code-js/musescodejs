/** @jsx jsx */
import { jsx } from '@emotion/core';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import ContactForm from '../components/ContactForm';

import { gridSize } from '../theme';

import { Container, H2} from '../primitives';

const ContactAnchor = (props) => {
    return (
        <a css={{
            color: 'inherit',
            textDecoration: 'none',
            ':hover': { textDecoration: 'underline' },
            }}
            {...props}    
        />        
    );
};

const ContactUs = ({...props}) => {
    return (
        <>
            <Meta
            title="Contact Us"
            description="Here you can contact us and subscribe to our mailing list."
            />
            <Navbar />
            <Container css={{ marginTop: gridSize * 3 }}>
                <H2 hasSeparator>Contact Us</H2>
                <Content {...props}>
                    <p>If you would like to be a mentor on one of our upcoming events fill in the <ContactAnchor
                        href="https://goo.gl/forms/Sj2ItylzLXOHc2342"
                        rel="noopener noreferrer" target="_blank">
                        Mentor's form
                        </ContactAnchor> and one of our organizators will get in touch with you shortly.
                    </p>

                    <p>If you would like to start a new chapter in your city, please contact us on <ContactAnchor 
                        href="mailto:info@musescodejs.org">                            
                        info@musescodejs.org                     
                        </ContactAnchor> and we will help you to bring this amazing events to your place!
                    </p>

                    <p>If your company would be interested to sponsor one of our upcoming events fill in the <ContactAnchor 
                        href="https://goo.gl/forms/8sPGUzY3p8uCYEcv1"
                        rel="noopener noreferrer" target="_blank">
                        Sponsor's form
                        </ContactAnchor> and one of our organizators will get in touch with you shortly.
                    </p>
                    <ContactForm css={{marginTop: gridSize * 5}} />
                </Content>                              
                
            </ Container>

            <Footer />
        </>
    );
};

const Content = props => <div css={{ maxWidth: 720 }} {...props} />;

export default ContactUs;