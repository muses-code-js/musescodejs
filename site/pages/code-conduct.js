/** @jsx jsx */
import { jsx } from '@emotion/core';

import { Container, H1, H5 } from '../primitives';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { gridSize } from '../theme';

const CodeConduct = () => {
  return (
    <>
      <Meta
        title="Code of Conduct"
        description="Muses run JavaScript and Node.js workshops for women, non-binary and trans folk around Australia."
      />
      <Navbar />
      <Container css={{ marginTop: gridSize * 3 }}>
        <H1 hasSeparator css={{ marginBottom: '0.66em' }}>
          Code of Conduct
        </H1>
        <Content>
          <H5>1. Purpose:</H5>
          <p>
            The Muses Code JS community is full of wonderful people from a diverse range of
            backgrounds, and we want to ensure it remains a welcoming and safe environment to all
            who wish to be a part of it.
          </p>

          <p>
            Whenever we come together as a community, our shared spaces are opportunities to
            showcase the best of what we can be. We are there to support our peers - to build each
            other up, to accept each other for who they are, and to encourage each other to become
            the people they want to be.
          </p>

          <p>
            With that in mind, if you are present at any Muses Code JS event, whether as an
            attendee, organiser, mentor, sponsor, or speaker, we take it as given that you agree to
            follow this code of conduct.
          </p>

          <H5>2. Expected Behaviour</H5>

          <p>The following behaviours are expected and requested of all community members:</p>

          <ul>
            <li>
              Participate in an authentic and active way. In doing so, you contribute to the health
              and longevity of this community.
            </li>
            <li>Exercise consideration and respect in your speech and actions.</li>
            <li>Attempt collaboration before conflict.</li>
            <li>Refrain from demeaning, discriminatory, or harassing behaviour and speech.</li>
            <li>
              Be mindful of your surroundings and of your fellow participants. Alert community
              leaders if you notice a dangerous situation, someone in distress, or violations of
              this Code of Conduct, even if they seem inconsequential.
            </li>
            <li>
              Remember that community event venues may be shared with members of the public; please
              be respectful to all patrons of these locations.
            </li>
          </ul>

          <H5>3. Unacceptable Behaviour</H5>

          <p>
            The following behaviours are considered harassment and are unacceptable within our
            community:
          </p>

          <ul>
            <li>
              Violence, threats of violence or violent language directed against another person.
            </li>
            <li>
              Sexist, racist, homophobic, transphobic, ableist or otherwise discriminatory jokes and
              language.
            </li>
            <li>Posting or displaying sexually explicit or violent material.</li>
            <li>
              Posting or threatening to post other people’s personally identifying information
              ("doxing").
            </li>
            <li>
              Personal insults, particularly those related to gender, sexual orientation, race,
              religion, or disability.
            </li>
            <li>Inappropriate photography or recording.</li>
            <li>
              Inappropriate physical contact. You should have someone’s consent before touching
              them.
            </li>
            <li>
              Unwelcome sexual attention. This includes, sexual comments or jokes; inappropriate
              touching, groping, and unwelcomed sexual advances.
            </li>
            <li>Deliberate intimidation, stalking or following (online or in person).</li>
            <li>Advocating for, or encouraging, any of the above behaviour.</li>
            <li>Sustained disruption of community events, including talks and presentations.</li>
          </ul>

          <H5>4. Consequences of Unacceptable Behaviour</H5>

          <p>
            Unacceptable behaviour from any community member, including sponsors and those with
            decision-making authority, will not be tolerated.
          </p>

          <p>Anyone asked to stop unacceptable behaviour is expected to comply immediately.</p>

          <p>
            If a community member engages in unacceptable behaviour, the community organisers may
            take any action they deem appropriate, up to and including a temporary ban or permanent
            expulsion from the community without warning (and without refund in the case of a paid
            event).
          </p>

          <H5>5. Reporting Guidelines</H5>

          <p>
            If you are subject to or witness unacceptable behaviour, or have any other concerns,
            please notify a community organiser as soon as possible:{' '}
            <a href="mailto:info@musescodejs.org" target="_blank" rel="noopener noreferrer">
              info@musescodejs.org
            </a>
          </p>

          <p>
            Additionally, community organisers are available to help community members engage with
            local law enforcement or to otherwise help those experiencing unacceptable behaviour
            feel safe. In the context of in-person events, organisers will also provide escorts as
            desired by the person experiencing distress.
          </p>

          <H5>6. Addressing Grievances</H5>

          <p>
            If you feel you have been falsely or unfairly accused of violating this Code of Conduct,
            you should notify{' '}
            <a href="mailto:info@musescodejs.org" target="_blank" rel="noopener noreferrer">
              Muses Code JS team
            </a>{' '}
            with a concise description of your grievance. Your grievance will be considered and you
            will be notified of our response and any decision.
          </p>

          <H5>7. Scope</H5>

          <p>
            We expect all community participants (contributors, paid or otherwise; sponsors; and
            other guests) to abide by this Code of Conduct in all community venues–online and
            in-person–as well as in all one-on-one communications pertaining to community business.
          </p>

          <p>
            This code of conduct and its related procedures also applies to unacceptable behaviour
            occurring outside the scope of community activities when such behaviour has the
            potential to adversely affect the safety and well-being of community members.
          </p>

          <H5>8. Contact Info</H5>

          <p>
            <a href="mailto:info@musescodejs.org" target="_blank" rel="noopener noreferrer">
              info@musescodejs.org
            </a>
          </p>

          <H5>9. License and attribution</H5>

          <p>
            This Code of Conduct is distributed under a{' '}
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Commons Attribution-ShareAlike license
            </a>
            .
          </p>

          <p>
            Portions of text derived from the{' '}
            <a href="http://sydjs.com/about" target="_blank" rel="noopener noreferrer">
              SydJS Code of Conduct
            </a>
            ,
            <a
              href="https://reactconfau.com/code-of-conduct"
              target="_blank"
              rel="noopener noreferrer"
            >
              ReactConf AU Code of conduct
            </a>
            ,
            <a
              href="https://www.djangoproject.com/conduct/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Django Code of Conduct
            </a>{' '}
            and the
            <a
              href="https://geekfeminism.wikia.org/wiki/Conference_anti-harassment/Policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Geek Feminism Anti-Harassment Policy
            </a>{' '}
            .
          </p>

          <p>
            Retrieved on August 20, 2019 from{' '}
            <a href="http://citizencodeofconduct.org/" target="_blank" rel="noopener noreferrer">
              citizencodeofconduct.org
            </a>
          </p>
        </Content>
      </Container>
      <Footer />
    </>
  );
};

const Content = props => <div css={{ maxWidth: 720 }} {...props} />;

export default CodeConduct;
