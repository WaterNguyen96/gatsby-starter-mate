import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const cardHeight = 270;
const CARD_HEIGHT = `${cardHeight}px`;
const TWO_THIRDS_CARD_HEIGHT = `${(cardHeight / 3) * 2}px`;
const HALF_CARD_HEIGHT = `${cardHeight / 2}px`;

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${TWO_THIRDS_CARD_HEIGHT});

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - ${HALF_CARD_HEIGHT});
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};
  height: 100%;

  ${MEDIA_QUERY_SMALL} {
    width: ${HALF_CARD_HEIGHT};
  }
`;

const ProjectImage = styled(Image)`
  width: ${TWO_THIRDS_CARD_HEIGHT};
  height: ${TWO_THIRDS_CARD_HEIGHT};
  padding: 20px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: ${HALF_CARD_HEIGHT};
    width: ${HALF_CARD_HEIGHT};
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: -${TWO_THIRDS_CARD_HEIGHT};
  );

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const Project = ({
  name,
  description,
  appStoreUrl,
  googlePlayUrl,
  type,
  publishedDate,
  logo,
}) => (
  <Card p={0}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <span>
          <Title my={2} pb={1}>
            {name}
          </Title>
        </span>
        <Text width={[1]} style={{ overflow: 'auto' }}>
          {description}
        </Text>
      </TextContainer>

      <ImageContainer>
        <ProjectImage src={logo.image.src} alt={logo.title} />
        <ProjectTag>
          <Flex
            style={{
              float: 'right',
            }}
          >
            {appStoreUrl && (
              <Box mx={1} fontSize={4}>
                <SocialLink
                  name="App Store"
                  fontAwesomeIcon="apple"
                  url={appStoreUrl}
                />
              </Box>
            )}
            {googlePlayUrl && (
              <Box mx={1} fontSize={4}>
                <SocialLink
                  name="CH Play"
                  fontAwesomeIcon="android"
                  url={googlePlayUrl}
                />
              </Box>
            )}
          </Flex>
          <ImageSubtitle
            bg="primaryLight"
            color="white"
            y="bottom"
            x="right"
            round
          >
            {type}
          </ImageSubtitle>
          <Hide query={MEDIA_QUERY_SMALL}>
            <ImageSubtitle bg="backgroundDark">{publishedDate}</ImageSubtitle>
          </Hide>
        </ProjectTag>
      </ImageContainer>
    </Flex>
  </Card>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  appStoreUrl: PropTypes.string,
  googlePlayUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
};

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" icon="💻" Box="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          contentfulAbout {
            projects {
              id
              name
              description
              appStoreUrl
              googlePlayUrl
              publishedDate(formatString: "YYYY")
              type
              logo {
                title
                image: resize(width: 200, quality: 100) {
                  src
                }
              }
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <CardContainer minWidth="350px">
          {contentfulAbout.projects.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Project {...p} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;
