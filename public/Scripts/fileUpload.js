const rootStyles = window.getComputedStyle(document.documentElement)

set()

function set() {
    console.log('set');
    if (rootStyles.getPropertyValue('--book-cover-width-large') != null && 
        rootStyles.getPropertyValue('--book-cover-width-large') !== '') {
            console.log('ready');
            ready()
    } else {
        console.log('setAgain');
        setAgain()
    }
}



function ready() {
    const coverWidth = 
                    parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspectRatio = 
                    parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverWidth / coverAspectRatio
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode
    )
    
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    })
    
    FilePond.parse(document.body)
}

function setAgain() {
    document.getElementById('main-css').addEventListener('load', () => {
        ready()
        console.log('Ready');
    })
}
