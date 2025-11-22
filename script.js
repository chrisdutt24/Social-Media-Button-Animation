const shareButton = document.getElementById('shareButton')
const label = shareButton.querySelector('.share-label')
const icons = shareButton.querySelectorAll('.share-icon')
const defaultLabel = label.dataset.default
const thankYouLabel = label.dataset.thankyou
const resetDelay = 1600
let resetTimer

const toggleIcons = (enabled) => {
  icons.forEach((icon) => {
    icon.disabled = !enabled
    icon.tabIndex = enabled ? 0 : -1
  })
}

const openShare = () => {
  if (shareButton.classList.contains('is-done')) return
  toggleIcons(true)
  shareButton.classList.add('is-open')
}

const closeShare = () => {
  if (shareButton.classList.contains('is-done')) return
  toggleIcons(false)
  shareButton.classList.remove('is-open')
}

const resetShare = () => {
  clearTimeout(resetTimer)
  shareButton.classList.remove('is-done')
  shareButton.classList.remove('is-open')
  toggleIcons(false)
  label.textContent = defaultLabel
}

const finishShare = () => {
  shareButton.classList.remove('is-open')
  shareButton.classList.add('is-done')
  label.textContent = thankYouLabel
  toggleIcons(false)
  clearTimeout(resetTimer)
  resetTimer = setTimeout(resetShare, resetDelay)
}

shareButton.addEventListener('mouseenter', openShare)
shareButton.addEventListener('mouseleave', closeShare)
shareButton.addEventListener('focusout', (event) => {
  if (!shareButton.contains(event.relatedTarget)) {
    closeShare()
  }
})

shareButton.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (shareButton.classList.contains('is-done')) {
      clearTimeout(resetTimer)
      resetShare()
      return
    }
    openShare()
  }
})

shareButton.addEventListener('click', () => {
  if (shareButton.classList.contains('is-done')) {
    clearTimeout(resetTimer)
    resetShare()
  }
})

icons.forEach((icon) => {
  icon.addEventListener('click', (event) => {
    event.stopPropagation()
    finishShare()
  })
})

toggleIcons(false)
