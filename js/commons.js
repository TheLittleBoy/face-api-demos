async function requestExternalImage(imageUrl) {
  const res = await fetch('fetch_external_image', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ imageUrl })
  })
  if (!(res.status < 400)) {
    console.error(res.status + ' : ' + await res.text())
    throw new Error('failed to fetch image from url: ' + imageUrl)
  }

  let blob
  try {
    blob = await res.blob()
    return await faceapi.bufferToImage(blob)
  } catch (e) {
    console.error('received blob:', blob)
    console.error('error:', e)
    throw new Error('failed to load image from url: ' + imageUrl)
  }
}

function renderNavBar(navbarId, exampleUri) {
  const examples = [
    {
      uri: 'faceDetection.html',
      name: '人脸检测'
    },
    {
      uri: 'faceLandmarkDetection.html',
      name: '人脸关键点'
    },
    {
      uri: 'faceExpressionRecognition.html',
      name: '人脸表情识别'
    },
    {
      uri: 'ageAndGenderRecognition.html',
      name: '年龄和性别'
    },
    {
      uri: 'faceRecognition.html',
      name: '人脸对比'
    },
    {
      uri: 'faceExtraction.html',
      name: '人脸提取和裁剪'
    },
    {
      uri: 'videoFaceTracking.html',
      name: '视频人脸跟踪'
    },
    {
      uri: 'webcamFaceDetection.html',
      name: '摄像头人脸检测'
    },
    {
      uri: 'webcamFaceLandmarkDetection.html',
      name: '摄像头人脸关键点'
    },
    {
      uri: 'webcamFaceExpressionRecognition.html',
      name: '摄像头人脸表情识别'
    },
    {
      uri: 'webcamAgeAndGenderRecognition.html',
      name: '摄像头年龄和性别'
    },
    {
      uri: 'bbtFaceLandmarkDetection.html',
      name: 'BBT Face Landmark Detection'
    },
    {
      uri: 'bbtFaceSimilarity.html',
      name: 'BBT Face Similarity'
    },
    {
      uri: 'bbtFaceMatching.html',
      name: 'BBT Face Matching'
    },
    {
      uri: 'bbtFaceRecognition.html',
      name: 'BBT Face Recognition'
    },
    {
      uri: 'batchFaceLandmarks.html',
      name: 'Batch Face Landmark Detection'
    },
    {
      uri: 'batchFaceRecognition.html',
      name: 'Batch Face Recognition'
    }
  ]

  const navbar = $(navbarId).get(0)
  const pageContainer = $('.page-container').get(0)

  const header = document.createElement('h3')
  header.innerHTML = examples.find(ex => ex.uri === exampleUri).name
  pageContainer.insertBefore(header, pageContainer.children[0])

  const menuContent = document.createElement('ul')
  menuContent.id = 'slide-out'
  menuContent.classList.add('side-nav', 'fixed')
  navbar.appendChild(menuContent)

  const menuButton = document.createElement('a')
  menuButton.href='#'
  menuButton.classList.add('button-collapse', 'show-on-large')
  menuButton.setAttribute('data-activates', 'slide-out')
  const menuButtonIcon = document.createElement('img')
  menuButtonIcon.src = '../menu_icon.png'
  menuButton.appendChild(menuButtonIcon)
  navbar.appendChild(menuButton)

  const li = document.createElement('li')
  const githubLink = document.createElement('a')
  githubLink.classList.add('waves-effect', 'waves-light', 'side-by-side')
  githubLink.id = 'github-link'
  githubLink.href = 'https://github.com/justadudewhohacks/face-api.js'
  const h5 = document.createElement('h5')
  h5.innerHTML = 'face-api.js'
  githubLink.appendChild(h5)
  li.appendChild(githubLink)
  menuContent.appendChild(li)

  examples
    .forEach(ex => {
      const li = document.createElement('li')
      if (ex.uri === exampleUri) {
        li.style.background='#b0b0b0'
      }
      const a = document.createElement('a')
      a.classList.add('waves-effect', 'waves-light', 'pad-sides-sm')
      a.href = ex.uri
      const span = document.createElement('span')
      span.innerHTML = ex.name
      span.style.whiteSpace = 'nowrap'
      a.appendChild(span)
      li.appendChild(a)
      menuContent.appendChild(li)
    })

  $('.button-collapse').sideNav({
    menuWidth: 260
  })
}

function renderSelectList(selectListId, onChange, initialValue, renderChildren) {
  const select = document.createElement('select')
  $(selectListId).get(0).appendChild(select)
  renderChildren(select)
  $(select).val(initialValue)
  $(select).on('change', (e) => onChange(e.target.value))
  $(select).material_select()
}

function renderOption(parent, text, value) {
  const option = document.createElement('option')
  option.innerHTML = text
  option.value = value
  parent.appendChild(option)
}