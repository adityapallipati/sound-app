function SoundNav() {
  const sounds = [
    { name: "1", path: "sounds/1.mp3" },
    { name: "2", path: "sounds/2.mp3" },
  ];

  return (
    <select>
      {sounds.map((sound, i) => (
        <option value={sound.path} key={`soundoption-${i}`}>
          {sound.name}
        </option>
      ))}
    </select>
  );
}

export default SoundNav;
