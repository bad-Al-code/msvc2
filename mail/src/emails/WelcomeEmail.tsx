import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Text,
} from '@react-email/components';

interface WelcomeEmailProps {
    name: string;
}

export const WelcomeEmail = ({
    name,
}: WelcomeEmailProps): React.ReactElement => {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
                <Container>
                    <Heading>Hello {name}, welcome to our service! </Heading>
                    <Text>We are excited to have you on board.</Text>
                </Container>
            </Body>
        </Html>
    );
};
