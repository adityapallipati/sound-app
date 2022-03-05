function SoundNav(props) {
  return (
    <select name="cars" id="cars">
      {props.sounds.map((sound) => (
        <option>{sound.name}</option>
      ))}
    </select>
  );
}

export default SoundNav;
