import { Fill, Stroke, Style, Icon, Text, Circle } from "ol/style"
const strokeColor = "#5ba5ff"

const image = new Circle({
	radius: 5,
	fill:  new Fill({
    color: "rgba(24, 144, 255, 0.2)"
  }),
	stroke: new Stroke({ color: "red", width: 1 })
})

const styles = {
	Point: new Style({
		image: image
	}),
	LineString: new Style({
		stroke: new Stroke({
			color: strokeColor,
			width: 1
		})
	}),
	MultiLineString: new Style({
		stroke: new Stroke({
			color: strokeColor,
			width: 1
		})
	}),
	MultiPoint: new Style({
		image: image
	}),
	MultiPolygon: new Style({
		stroke: new Stroke({
			color: "#6e88b9",
			width: 3
		}),
		fill: new Fill({
			color: "rgba(24, 144, 255, 0.2)"
		})
	}),
	Polygon: new Style({
		stroke: new Stroke({
			color: strokeColor,
			lineDash: [4],
			width: 3
		}),
		fill: new Fill({
			color: "rgba(24, 144, 255, 0.2)"
		})
	}),
	GeometryCollection: new Style({
		stroke: new Stroke({
			color: "magenta",
			width: 2
		}),
		fill: new Fill({
			color: "magenta"
		}),
		image: new Circle({
			radius: 10,
			fill: null,
			stroke: new Stroke({
				color: "magenta"
			})
		})
	}),
	Circle: new Style({
		stroke: new Stroke({
			color: "red",
			width: 2
		}),
		fill: new Fill({
			color: "rgba(255,0,0,0.2)"
		})
	})
}

export default function (feature) {
	return styles[feature.getGeometry().getType()]
}
