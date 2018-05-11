function fetchAlbums() {
	fetch('https://rallycoding.herokuapp.com/api/music_albums')
	.then(res => res.json())
	.then(json => console.log(json));
}

fetchAlbums();


async function fetchAlbums() {
	const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
	const json = await res.json()

	console.log(json);
}

fetchAlbums();



const fetchAlbums = async () => {
	const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
	const json = await res.json()
	
	console.log(json);
}

fetchAlbums();





mongodb://sdharwick:password@ds239988.mlab.com:39988/sd-emaily-prod