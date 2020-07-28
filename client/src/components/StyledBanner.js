import Styled from 'styled-components'
import defaultImg from '../images/404.png'

const StyledBanner = Styled.header`
    min-height: 60vh;
    background: url(${props => props.img ? props.img : defaultImg}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`
export default StyledBanner;