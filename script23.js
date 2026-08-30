const drop = document.getElementById("drop");
const image = document.getElementById("image");
const cleaner = document.getElementById("cleaner");
const inpFile = document.getElementById("inpFile");
const endpoint = "upload.php";
const endpoint2 = "json.php";


let frame = drop.querySelector(".frame");
let imageURL;

fetch('data.json', {
    headers: {
    'Cache-Control' : 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires': 0
    }
})
    .then(res => res.json())
    .then(data => {
        imageURL = data
        
        if(data !== null) {
        
            frame = document.createElement("div");
            frame.classList.add("frame");
            drop.appendChild(frame);
            frame.style.backgroundImage = `url('${ imageURL }')`;
        }
    })
    .catch(console.error);

console.log("imageURL " + imageURL)


document.querySelectorAll(".file_input").forEach(inputElement => {
	const spot = inputElement.closest(".board");
	spot.addEventListener("dragover", e => {
		e.preventDefault();
		console.log("dragover")
	});

	spot.addEventListener("drop", e => {
		e.preventDefault();
		if (e.dataTransfer.files.length) {
			inputElement.files = e.dataTransfer.files;
			upload(spot, e.dataTransfer.files[0]);
		};
	});
});

function upload(spot, file) {

    if (!frame){
        frame = document.createElement("div");
        frame.classList.add("frame");
        drop.appendChild(frame);
    }

    if (file.type.startsWith("image/")) {

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            URL = reader.result;
            frame.style.backgroundImage = `url('${ URL }')`;
                    	
        	fetch(endpoint2, {
        		method: "post",
        		headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        		body: JSON.stringify(URL)
        	})
        	.catch(console.error);
        }
    }

/*
	const formData = new FormData();
	formData.append("inpFile", inpFile.files[0]);
	fetch(endpoint, {
		method: "post",
		body: formData
	})
	.catch(console.error);
	let fileName = file.name
	
	fetch(endpoint2, {
		method: "post",
		headers: {"Content-Type" : "application/json"},
		body: JSON.stringify(fileName)
	})
	.then(res => console.log(res))
	.catch(console.error);
*/
}

function tracker() {
        fetch('data.json',{
            headers: {
            'Cache-Control' : 'no-cache, no-store, must-revalidate',
            'Pragma' : 'no-cache',
            'Expires': 0
            }
        })
        .then(res => res.json())
        .then(data => {
            let newURL = data
            console.log("new URL " + newURL)
            if(newURL !== imageURL){
            console.log("changed")
            location.reload()
            }
        })
}

setInterval(() => tracker(), 2000);

/*
function tracker() {
        fetch('data.json',{
            headers: {
            'Cache-Control' : 'no-cache, no-store, must-revalidate',
            'Pragma' : 'no-cache',
            'Expires': 0
            }
        })
        .then(res => res.json())
        .then(data => {
            let newName = data
            console.log("new name " + newName)
            if(newName !== name){
            console.log("changed")
            location.reload()
            }
        })
}

setInterval(() => tracker(), 2000);
*/