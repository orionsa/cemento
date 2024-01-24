import placeholder from '../../assets/avatar.png';
import './Avatar.scss';

export const Avatar = ({ avatar }) => {
  return (
    <div className='avatar'>
      <img className='avatar__image' src={avatar || placeholder} /> 
    </div>
  )
}