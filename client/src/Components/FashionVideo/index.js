import video from '../../Assests/video.mp4';
import styled from 'styled-components';


const StyledCompartment = styled.div`
    position: relative;
    display: flex;
    padding-top: 180px;
    padding-bottom: 150px;
    padding-right:0px;
    padding-left:0px;
    justify-content: center;
    padding-top: 0px;
    width: 100%;
    /* margin: auto; * so video can be placed center */
    div{
        z-index: 50;
        position: absolute;
    }
`;

const Video = styled.video`
  width: 110%;
  height: auto;
  z-index: 5;
`;


const FashionVideo = () => {
    return (
        <StyledCompartment >
            <Video autoPlay muted loop >
                <source src={video} type="video/mp4" />
            </Video>
        </StyledCompartment>
    );
};

export default FashionVideo;