/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}
navLink.forEach((n) => n.addEventListener("click", linkAction))

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header")
  if (this.scrollY >= 80) nav.classList.add("scroll-header")
  else nav.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

/*==================== PROGRESS BAR ====================*/
function updateProgressBar() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / scrollHeight) * 100

  const progressBar = document.getElementById("progressBar")
  if (progressBar) {
    progressBar.style.width = progress + "%"
  }
}

window.addEventListener("scroll", updateProgressBar)

/*==================== SCROLL TO TOP FUNCTIONALITY ====================*/
const scrollTop = document.getElementById("scroll-top")

// Show/hide scroll to top button
function showHideScrollTop() {
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll")
  else scrollTop.classList.remove("show-scroll")
}
window.addEventListener("scroll", showHideScrollTop)

/*==================== SCROLL TO TOP CLICK FUNCTIONALITY ====================*/
// Add click functionality to scroll to top button
if (scrollTop) {
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const activeLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]")
      if (activeLink) {
        document.querySelectorAll(".nav__link").forEach((link) => link.classList.remove("active-link"))
        activeLink.classList.add("active-link")
      }
    }
  })
}
window.addEventListener("scroll", scrollActive)

/*==================== TESTIMONIALS SLIDER ====================*/
class TestimonialSlider {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".testimonial__card")
    this.dots = document.querySelectorAll(".testimonial__dot")
    this.prevBtn = document.querySelector(".testimonial__btn--prev")
    this.nextBtn = document.querySelector(".testimonial__btn--next")

    if (this.slides.length > 0) {
      this.init()
    }
  }

  init() {
    this.showSlide(0)
    this.bindEvents()
    this.autoPlay()
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide())
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide())
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index))
    })
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all dots
    this.dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show current slide
    if (this.slides[index]) {
      this.slides[index].classList.add("active")
    }
    if (this.dots[index]) {
      this.dots[index].classList.add("active")
    }

    this.currentSlide = index
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.showSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.showSlide(prevIndex)
  }

  goToSlide(index) {
    this.showSlide(index)
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide()
    }, 15000)
  }
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

/*==================== CONTACT FORM ====================*/
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm")
    if (this.form) {
      this.init()
    }
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData)

    // Validate form
    if (!this.validateForm(data)) {
      return
    }

    // Simulate form submission
    this.submitForm(data)
  }

  validateForm(data) {
    const { name, email, service } = data

    if (!name || !name.trim()) {
      this.showMessage("Por favor, preencha seu nome.", "error")
      return false
    }

    if (!email || !email.trim() || !this.isValidEmail(email)) {
      this.showMessage("Por favor, insira um e-mail válido.", "error")
      return false
    }

    if (!service) {
      this.showMessage("Por favor, selecione um tipo de serviço.", "error")
      return false
    }

    return true
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  submitForm(data) {
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      this.showMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
      this.form.reset()

      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create message element
    const messageEl = document.createElement("div")
    messageEl.className = `form-message form-message--${type}`
    messageEl.textContent = message

    // Add styles
    messageEl.style.cssText = `
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-weight: 500;
            ${
              type === "success"
                ? "background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;"
                : "background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;"
            }
        `

    // Insert message
    this.form.insertBefore(messageEl, this.form.firstChild)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove()
      }
    }, 5000)
  }
}

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const headerHeight = document.querySelector(".header")?.offsetHeight || 0
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

/*==================== TYPING ANIMATION ====================*/
class TypingAnimation {
  constructor(element, texts, speed = 100) {
    this.element = element
    this.texts = texts
    this.speed = speed
    this.textIndex = 0
    this.charIndex = 0
    this.isDeleting = false

    this.init()
  }

  init() {
    this.type()
  }

  type() {
    const currentText = this.texts[this.textIndex]

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1)
      this.charIndex--
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1)
      this.charIndex++
    }

    let typeSpeed = this.speed

    if (this.isDeleting) {
      typeSpeed /= 2
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000
      this.isDeleting = true
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false
      this.textIndex = (this.textIndex + 1) % this.texts.length
      typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

/*==================== COUNTER ANIMATION ====================*/
function animateCounters() {
  const counters = document.querySelectorAll(".stat__number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
    if (isNaN(target)) return

    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + (counter.textContent.includes("%") ? "%" : "+")
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target + (counter.textContent.includes("%") ? "%" : "+")
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

/*==================== FLOATING ELEMENTS PARALLAX ====================*/
function parallaxEffect() {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-card")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
}

/*==================== PRELOADER ====================*/
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

/*==================== LAZY LOADING IMAGES ====================*/
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      if (img.dataset.src) {
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    }
  })
})

/*==================== ESPECIALIDADES ANIMATIONS ====================*/
class EspecialidadesAnimations {
  constructor() {
    this.cards = document.querySelectorAll(".specialty-card")
    this.section = document.querySelector(".specialties")
    if (this.cards.length > 0) {
      this.init()
    }
  }

  init() {
    this.setupIntersectionObserver()
    this.setupHoverEffects()
    this.setupAccessibility()
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCards()
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    if (this.section) {
      observer.observe(this.section)
    }
  }

  animateCards() {
    this.cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-in")
      }, index * 100)
    })
  }

  setupHoverEffects() {
    this.cards.forEach((card) => {
      const icon = card.querySelector(".card-icon")

      card.addEventListener("mouseenter", () => {
        this.addHoverEffect(card, icon)
      })

      card.addEventListener("mouseleave", () => {
        this.removeHoverEffect(card, icon)
      })
    })
  }

  addHoverEffect(card, icon) {
    // Adiciona efeito de brilho no ícone
    if (icon) {
      icon.style.boxShadow = "0 8px 25px rgba(218, 122, 0, 0.4)"
    }

    // Anima as features
    const features = card.querySelectorAll(".card-features li")
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.transform = "translateX(5px)"
        feature.style.transition = "transform 0.2s ease"
      }, index * 50)
    })
  }

  removeHoverEffect(card, icon) {
    // Remove efeito do ícone
    if (icon) {
      icon.style.boxShadow = ""
    }

    // Reset das features
    const features = card.querySelectorAll(".card-features li")
    features.forEach((feature) => {
      feature.style.transform = ""
    })
  }

  setupAccessibility() {
    this.cards.forEach((card) => {
      // Adiciona atributos de acessibilidade
      card.setAttribute("tabindex", "0")
      card.setAttribute("role", "article")

      // Adiciona descrição para leitores de tela
      const title = card.querySelector(".card-title")
      const description = card.querySelector(".card-description")

      if (title && description) {
        const ariaLabel = `${title.textContent}: ${description.textContent}`
        card.setAttribute("aria-label", ariaLabel)
      }

      // Navegação por teclado
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          this.handleCardActivation(card)
        }
      })

      // Efeitos de foco
      card.addEventListener("focus", () => {
        card.style.outline = "2px solid var(--orange)"
        card.style.outlineOffset = "2px"
      })

      card.addEventListener("blur", () => {
        card.style.outline = ""
        card.style.outlineOffset = ""
      })
    })
  }

  handleCardActivation(card) {
    // Simula clique ou ação quando ativado via teclado
    card.style.transform = "translateY(-8px)"
    card.style.boxShadow = "var(--shadow-heavy)"

    setTimeout(() => {
      card.style.transform = ""
      card.style.boxShadow = ""
    }, 200)

    // Aqui você pode adicionar ação específica, como abrir modal ou navegar
    console.log("Card ativado:", card.querySelector(".card-title")?.textContent)
  }
}

/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
// Keyboard navigation for testimonial slider
document.addEventListener("keydown", (e) => {
  const prevBtn = document.querySelector(".testimonial__btn--prev")
  const nextBtn = document.querySelector(".testimonial__btn--next")

  if (e.key === "ArrowLeft" && prevBtn) {
    prevBtn.click()
  } else if (e.key === "ArrowRight" && nextBtn) {
    nextBtn.click()
  }
})

// Focus management for mobile menu
const navToggleBtn = document.getElementById("nav-toggle")
const navCloseBtn = document.getElementById("nav-close")

if (navToggleBtn && navCloseBtn) {
  navToggleBtn.addEventListener("click", () => {
    setTimeout(() => {
      navCloseBtn.focus()
    }, 100)
  })
}

/*==================== ERROR HANDLING ====================*/
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
})

/*==================== INITIALIZE ALL COMPONENTS ====================*/
document.addEventListener("DOMContentLoaded", () => {
  // Initialize testimonial slider
  new TestimonialSlider()

  // Initialize contact form
  new ContactForm()

  // Initialize especialidades animations
  new EspecialidadesAnimations()

  // Initialize typing animation if element exists
  const typingElement = document.querySelector(".typing-text")
  if (typingElement) {
    const texts = ["bem-estar mental", "autoconhecimento", "equilíbrio emocional", "crescimento pessoal"]
    new TypingAnimation(typingElement, texts)
  }

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
  animatedElements.forEach((el) => observer.observe(el))

  // Observe stats section for counter animation
  const statsSection = document.querySelector(".home__stats")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }

  // Observe lazy images
  const lazyImages = document.querySelectorAll("img[data-src]")
  lazyImages.forEach((img) => imageObserver.observe(img))

  // Apply debounced scroll events
  window.addEventListener(
    "scroll",
    debounce(() => {
      scrollHeader()
      updateProgressBar()
      showHideScrollTop()
      scrollActive()
      parallaxEffect()
    }, 10),
  )
})
