import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import { Heading, Text as TextBass, Box, Image, Flex } from 'rebass';
import Section from '../components/Section';
import Triangle from '../components/Triangle';
import AchievementsTimeline from '../components/AchievementsTimeline';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['40vh', '60vh']}
      width={['95vw', '90vw']}
      invertX
    />
    <Triangle
      color="secondaryLight"
      height={['20vh', '20vh']}
      width={['100vw', '49vw']}
      invertY
    />
  </div>
);

const Container = styled.div`
  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
`;

const Title = styled(Heading)`
  border-bottom: ${props => props.theme.colors.secondary} 3px solid;
  padding-bottom: 15px;
`;

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const Text = styled(TextBass)`
  text-align: center !important;
`;
const Achievements = () => (
  <Section.Container id="achievements" Background={Background}>
    <Section.Header name="Achievements" icon="🏆" label="cup" />
    <StaticQuery
      query={graphql`
        query AchievementsQuery {
          contentfulAbout {
            achievements {
              title
              achievedDate(formatString: "MMM DD, YYYY")
              detailDescription {
                detailDescription
              }
            }
          }
        }
      `}
      render={data => {
        const { achievements } = data.contentfulAbout;
        const content = achievements.map((achievement, index) => {
          return {
            date: achievement.achievedDate,
            component: (
              // eslint-disable-next-line react/no-array-index-key
              <Container key={index}>
                <Title>{achievement.title}</Title>

                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
                    <Text m={3}>
                      {achievement.detailDescription.detailDescription}
                    </Text>
                  </Box>
                  <Box
                    width={[1, 1, 2 / 6]}
                    style={{ maxWidth: '300px', margin: 'auto' }}
                  >
                    {/* <ProfilePicture
                      src={profile.image.src}
                      alt={profile.title}
                      mt={[4, 4, 0]}
                      ml={[0, 0, 1]}
                    /> */}
                  </Box>
                </Flex>
              </Container>
            ),
          };
        });
        return (
          <div>
            <Fade bottom delay={200}>
              <AchievementsTimeline content={content} />
            </Fade>
          </div>
        );
      }}
    />
  </Section.Container>
);

export default Achievements;
