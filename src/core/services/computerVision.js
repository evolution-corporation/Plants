const apiKey = 'AIzaSyApB7uKFy60HuFXvJsQEXuiZUIVNDC4y_4';

async function GoogleCV({ type, image }) {
  const result = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: image,
            },
            features: {
              type: type,
            },
          },
        ],
      }),
    },
  );
  const json = await result.json();
  return json.responses[0];
}

async function checkImageCensure({ image }) {
  return true;
  const { safeSearchAnnotation } = await GoogleCV({
    type: 'SAFE_SEARCH_DETECTION',
    image,
  });
  return !(
    ['POSSIBLE', 'LIKELY', 'VERY_LIKELY'].includes(
      safeSearchAnnotation.adult,
    ) ||
    ['POSSIBLE', 'LIKELY', 'VERY_LIKELY'].includes(
      safeSearchAnnotation.violence,
    ) ||
    ['POSSIBLE', 'LIKELY', 'VERY_LIKELY'].includes(safeSearchAnnotation.racy)
  );
}

async function checkPlant({ image }) {
  return true;
  const { labelAnnotations } = await GoogleCV({
    type: 'LABEL_DETECTION',
    image,
  });
  console.log(labelAnnotations);
  const item = labelAnnotations.find((item) => item.description == 'Plant');
  retunr(item.score >= 0.5 && item.topicality >= 0.5);
}

export default {
  GoogleCV,
  checkImageCensure,
  checkPlant,
};
