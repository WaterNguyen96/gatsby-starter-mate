import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import HorizontalTimeline from 'react-horizontal-timeline';

const DetailContainer = styled.div`
  text-align: center !important;
`;

const ContentContainer = styled.div`
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

export default class AchievementsTimeline extends React.Component {
  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      previous: 0,

      // timelineConfig
      minEventPadding: 20,
      maxEventPadding: 120,
      linePadding: 100,
      labelWidth: 100,
      fillingMotionStiffness: 150,
      fillingMotionDamping: 25,
      slidingMotionStiffness: 150,
      slidingMotionDamping: 25,
      stylesBackground: '#f8f8f8',
      stylesForeground: '#7b9d6f',
      stylesOutline: '#dfdfdf',
      isTouchEnabled: true,
      isKeyboardEnabled: true,
      isOpenEnding: true,
      isOpenBeginning: true,
    };
  }

  componentWillMount() {
    this.dates = this.props.content.map(entry => entry.date);
  }

  componentWillReceiveProps(nextProps) {
    this.dates = nextProps.content.map(entry => entry.date);
  }

  render() {
    const state = this.state;

    const views = this.props.content.map((entry, index) => {
      // eslint-disable-next-line react/no-array-index-key
      return <ContentContainer key={index}>{entry.component}</ContentContainer>;
    });

    return (
      <div>
        <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            fillingMotion={{
              stiffness: state.fillingMotionStiffness,
              damping: state.fillingMotionDamping,
            }}
            index={state.value}
            indexClick={index => {
              this.setState({ value: index, previous: state.value });
            }}
            isKeyboardEnabled={state.isKeyboardEnabled}
            isTouchEnabled={state.isTouchEnabled}
            labelWidth={state.labelWidth}
            linePadding={state.linePadding}
            maxEventPadding={state.maxEventPadding}
            minEventPadding={state.minEventPadding}
            slidingMotion={{
              stiffness: state.slidingMotionStiffness,
              damping: state.slidingMotionDamping,
            }}
            styles={{
              background: state.stylesBackground,
              foreground: state.stylesForeground,
              outline: state.stylesOutline,
            }}
            values={this.dates}
            isOpenEnding={state.isOpenEnding}
            isOpenBeginning={state.isOpenBeginning}
          />
        </div>
        <DetailContainer>
          <SwipeableViews
            index={state.value}
            onChangeIndex={(value, previous) => {
              this.setState({ value, previous });
            }}
            resistance
          >
            {views}
          </SwipeableViews>
        </DetailContainer>
      </div>
    );
  }
}
