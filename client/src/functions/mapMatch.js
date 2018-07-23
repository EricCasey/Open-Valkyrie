import axios from 'axios';
import FormData from 'form-data';

function mapMatch(file) {
    //console.log("Map Match")

    const formData = new FormData()
    const config = { headers: { 'content-type': 'multipart/form-data' } }

    formData.append('mapinput', file, "input.png")

    //for (var key of formData.entries()) {
        //console.log("printing formdata")
        //console.log(key);
    //}

    axios.post('http://localhost:3001/api/upload-map', formData, config)

    var matchVars = ''
    const scope = this

    fetch('http://localhost:9900/opencv/matchtemplate', { method: 'POST', body: formData })
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        var points = scope.state.points
        console.log(points[points.length - 1][1] - json.match[1])
        console.log(points[points.length - 1][2] - json.match[2])
        //if(Math.abs(points[points.length - 1][1] - json.match[1]) < 200 && Math.abs(points[points.length - 1][1] - json.match[1]) < 200) {
            //console.log("GOOD POINT")
            points.push(json.match)
        //} else if (points.length === 1) {
            //points.push(json.match)
        //}
        scope.setState({ mapMatchVal: json.match, points: points });

    });

}
export default mapMatch
