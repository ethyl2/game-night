(function () {
    let placement = null
  
    fetchCompanyData(function (fetchedPlacement) {
      placement = fetchedPlacement
      const body = document.querySelector('body')
      const container = buildContainer()
      const innerWrapper = buildInnerWrapper()

      if (placement.referral_payout_tooltip) {
        const referralPayoutTooltip = buildReferralPayoutTooltip(placement)
        innerWrapper.append(referralPayoutTooltip)
      }
      const header = buildHeader()
      const logo = buildLogo()
      const infoIcon = buildInfoIcon()
      const referralParagraph = buildParagraphWithSpan(placement, 'referral')
     
      const saleParagraph = buildParagraphWithSpan(placement, 'sale')
      const payoutInfo = buildPayoutInfo(referralParagraph, saleParagraph)
      const button = buildAnchorElement()
      const headerWrapper = buildHeaderWrapper()
      const closeButton = buildClose()
     
      loadFont()
      addStyles()
      body.append(container)
      container.append(innerWrapper)
      innerWrapper.append(headerWrapper)
      headerWrapper.append(logo)
      headerWrapper.append(header)
      
      innerWrapper.append(payoutInfo)
      innerWrapper.append(button)
      innerWrapper.append(closeButton)

      if (placement.referral_payout_tooltip) {
        referralParagraph.append(infoIcon)
      }

      const referralPayoutTooltipButton = document.querySelector('#sb-referral-tooltip-button')
      const referralPayoutTooltip = document.querySelector('#sb-referral-payout-tooltip')
      addEventListeners(referralPayoutTooltipButton, referralPayoutTooltip)

      setTimeout(() => {
        toggleVisibility()
      }, 3500)
    })
  
    function buildContainer() {
        const container = document.createElement('div')
        container.id = 'sb-sticky-referral-widget'
        container.setAttribute('role', 'region')
        container.setAttribute('aria-label', 'Referral program widget')
        container.style.display = 'none'
        return container
    }
  
    function buildInnerWrapper() {
      const wrapper = document.createElement('div')
      wrapper.id = 'sb-sticky-referral-widget-wrapper'
      return wrapper
    }
  
    function buildHeader() {
      const element = document.createElement('h3')
      element.textContent = 'Refer a friend and get paid!'
      return element
    }
  
    function buildHeaderWrapper() {
      const wrapper = document.createElement('div')
      wrapper.id = 'sb-header-wrapper'
     
      return wrapper
    }
  
    function buildParagraphWithSpan(placement, type) {
  
      const paragraphElement = document.createElement('p')
      paragraphElement.classList.add('sb-payout-info')

      const spanElement = document.createElement('span')
      spanElement.classList.add('sb-amount')
      spanElement.textContent = `${placement[`${type}_payout`]}` 
  
      paragraphElement.appendChild(spanElement)
  
      paragraphElement.innerHTML += 'for each '

      if (placement.referral_payout_tooltip && type === 'referral') {
       const referralPayoutTooltipButton = document.createElement('button')
       referralPayoutTooltipButton.classList.add('tooltip-button')
       referralPayoutTooltipButton.textContent = 'qualified referral'
       referralPayoutTooltipButton.id = 'sb-referral-tooltip-button'
        paragraphElement.appendChild(referralPayoutTooltipButton)
      } else {
        paragraphElement.innerHTML += `qualified ${type}`
      }
  
      return paragraphElement
    }

    function buildPayoutInfo(referralParagraph, saleParagraph) {
        const payoutInfo = document.createElement('div')
        payoutInfo.id = 'sb-payout-info-container'
       
        payoutInfo.appendChild(referralParagraph)
        payoutInfo.appendChild(saleParagraph)
        return payoutInfo
    }
  
    function buildAnchorElement() {
  
      const anchorElement = document.createElement('a')
      anchorElement.href = placement.url
  
      const spanElement = document.createElement('span')
      spanElement.textContent = 'Join Referral Program'
  
      anchorElement.appendChild(spanElement);
  
      return anchorElement
    }

    function buildClose() {
      const closeButton = document.createElement('span')
      closeButton.id = 'sb-sticky-referral-widget-close'
      closeButton.classList.add('material-icons')
      closeButton.setAttribute('aria-label', 'Close referral widget')
      closeButton.textContent = 'close'
      closeButton.setAttribute('tabindex', '0') 
      closeButton.addEventListener('click', toggleVisibility)
      closeButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          toggleVisibility()
        }
      })
      return closeButton
    }

    function buildReferralPayoutTooltip(placement) {
        const tooltip = document.createElement('div')
        tooltip.classList.add('tooltip')
        tooltip.id = 'sb-referral-payout-tooltip'
        tooltip.textContent = placement.referral_payout_tooltip
        Object.assign(tooltip.style, {
            position: 'absolute',
            backgroundColor: 'white',
            color: 'black',
            padding: '5px',
            borderRadius: '4px',
            zIndex: '9999',
            display: 'none',
            fontSize: '12px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'opacity 0.3s',
            opacity: '0',
            visibility: 'hidden',
            width: '200px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.5',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        })
        return tooltip
    }

    function buildInfoIcon() {
        const htmlText = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4A90E2"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`
        const infoIconDiv = document.createElement('span')
        infoIconDiv.innerHTML = htmlText
        return infoIconDiv
    }
  
    function toggleVisibility() {
      const container = document.querySelector('#sb-sticky-referral-widget')
      if (container.style.display === 'none') {
        container.style.display = 'block'

        setTimeout(() => {
          container.classList.toggle('slide-in')
        }, 500)
      } else {
        container.classList.toggle('slide-out')
        setTimeout(() => {
          container.style.display = 'none'
        }, 500)
      }
    }
  
    function fetchCompanyData(callback) {
        // to use live repo: `https://components.bestcompany.com/api/${company}/sticky-referral-widget/${placement}`
        // data-company="vn9yk7w8BN" data-placement="9b8c4b94-2ade-4901-8ebc-f30565836230"
      const company = document.querySelector('#bc-sticky-referral-widget-script').dataset.company
      const placement = document.querySelector('#bc-sticky-referral-widget-script').dataset.placement
      const xhr = new XMLHttpRequest()
      xhr.open('GET', `http://bestcompany-components.test/api/${company}/sticky-referral-widget/${placement}`, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)
          callback(data)
        }
      };
      xhr.send(null)
      xhr.onerror = function () {
        console.error('Failed to fetch referral widget data.')
        }
    }

    function buildLogo() {
        const svgContainer = document.createElement('div')
        svgContainer.id = 'sb-svg-container'
        const htmlText = `
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill='#18A571'
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M12 7.5C10.7574 7.5 9.75 8.50736 9.75 9.75C9.75 10.9926 10.7574 12 12 12C13.2426 12 14.25 10.9926 14.25 9.75C14.25 8.50736 13.2426 7.5 12 7.5Z" fill="#18A571"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 4.875C1.5 3.83947 2.33947 3 3.375 3H20.625C21.6605 3 22.5 3.83947 22.5 4.875V14.625C22.5 15.6605 21.6605 16.5 20.625 16.5H3.375C2.33947 16.5 1.5 15.6605 1.5 14.625V4.875ZM8.25 9.75C8.25 7.67893 9.92893 6 12 6C14.0711 6 15.75 7.67893 15.75 9.75C15.75 11.8211 14.0711 13.5 12 13.5C9.92893 13.5 8.25 11.8211 8.25 9.75ZM18.75 9C18.3358 9 18 9.33579 18 9.75V9.7575C18 10.1717 18.3358 10.5075 18.75 10.5075H18.7575C19.1717 10.5075 19.5075 10.1717 19.5075 9.7575V9.75C19.5075 9.33579 19.1717 9 18.7575 9H18.75ZM4.5 9.75C4.5 9.33579 4.83579 9 5.25 9H5.2575C5.67171 9 6.0075 9.33579 6.0075 9.75V9.7575C6.0075 10.1717 5.67171 10.5075 5.2575 10.5075H5.25C4.83579 10.5075 4.5 10.1717 4.5 9.7575V9.75Z" fill="#18A571"/>
                <path d="M2.25 18C1.83579 18 1.5 18.3358 1.5 18.75C1.5 19.1642 1.83579 19.5 2.25 19.5C7.65005 19.5 12.8802 20.2222 17.8498 21.5749C19.0404 21.899 20.25 21.0168 20.25 19.7551V18.75C20.25 18.3358 19.9142 18 19.5 18H2.25Z" fill="#18A571"/>
            </svg>
        `
        svgContainer.innerHTML = htmlText
        return svgContainer
    }

    function addEventListeners(triggerButton, targetElement) {
        triggerButton.addEventListener('mouseenter', () => {
            targetElement.style.display = 'block'
            targetElement.style.opacity = '1'
            targetElement.style.visibility = 'visible'
        })
        
        triggerButton.addEventListener('mouseleave', () => {
            targetElement.style.display = 'none'
            targetElement.style.opacity = '0'
            targetElement.style.visibility = 'hidden'
        })
        
        // Mobile touch support
        triggerButton.addEventListener('touchstart', () => {
            targetElement.style.display = 'block'
            targetElement.style.opacity = '1'
            targetElement.style.visibility = 'visible'
        })
        
        triggerButton.addEventListener('touchend', () => {
            setTimeout(() => { // Small delay to allow user to see the tooltip before hiding
                targetElement.style.display = 'none'
                targetElement.style.opacity = '0'
                targetElement.style.visibility = 'hidden'
            }, 1500)
        })
    }
  
    function loadFont() {
      const materialLinkTag = document.createElement('link')
      const latoLinkTag = document.createElement('link')
      const head = document.querySelector('head')
      materialLinkTag.rel = 'stylesheet'
      materialLinkTag.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
      latoLinkTag.rel = 'stylesheet'
      latoLinkTag.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap'
      head.append(materialLinkTag)
      head.append(latoLinkTag)
    }
  
    function addStyles() {
      const styleTag = document.createElement('style')
      const head = document.querySelector('head')
      const materialCSSString = `
        #sb-sticky-referral-widget * {
            box-sizing: border-box;
        }

        #sb-sticky-referral-widget {
            box-sizing: border-box;
            font-size: 16px;
            cursor: pointer;
            transform: translate(0px, 0%);
            left: 25px;
            top: 100%;
            font-family: 'Lato', Arial, sans-serif;
            position: fixed;
            width: 350px !important;
            z-index: 1000;
        }

        #sb-sticky-referral-widget p {
            margin: 0;
            padding: 0;
        }

        #sb-sticky-referral-widget h3 {
            margin: 0;
        }

        #sb-sticky-referral-widget #sb-sticky-referral-widget-wrapper {
            padding: 18px 16px 16px 16px;
            background-color: white;
            width: 100%;
            box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.24);
            color: #5C5D5F;
            border-radius: 12px;
            margin-bottom: 25px;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: relative;
        }

        #sb-sticky-referral-widget #sb-sticky-referral-widget-close {
            font-size: 20px;
            background: #f4f4f4;
            color: #5C5D5F;
            position: absolute;
            top: 8px;
            right: 8px;
            border-radius: 50%;
            padding: 3px;
            cursor: pointer;
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-smoothing: antialiased;
            -webkit-font-feature-settings: 'liga';
        }

        #sb-sticky-referral-widget #sb-sticky-referral-widget-close:hover {
            background: #F8FAFC !important;
            color: #18365B !important;
        }

        #sb-sticky-referral-widget #sb-header-wrapper {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 6px;
        }

        #sb-sticky-referral-widget #sb-svg-container {
           background-color: #F2FAEB;
           margin-right: 5px;
           padding: 10px;
           border-radius: 50%;
        }

        #sb-sticky-referral-widget #sb-payout-info-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 0;
        }

        #sb-sticky-referral-widget .sb-payout-info {
            text-align: left;
            margin: 0;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            justify-content: center;
        }

        #sb-sticky-referral-widget .sb-amount {
            font-weight: bold;
            color: #18A571;
        }
    
        #sb-sticky-referral-widget #sb-sticky-referral-widget-wrapper h3 {
            font-weight: bold;
            font-size: 18px;
            margin: 0 !important;
        }
    
        #sb-sticky-referral-widget #sb-sticky-referral-widget-wrapper a {
            display: inline-block;
            background-color: #18A571;
            color: #fff;
            text-decoration: none;
            padding: 7px 20px;
            border-radius: 6px;
            max-width: 350px;
            transition: background-color 0.3s ease;
        }

        #sb-sticky-referral-widget #sb-sticky-referral-widget-wrapper a:hover {
            background-color: #00B985; 
        }

        #sb-sticky-referral-widget.slide-in {
            transform: translate(0px, -100%);
            animation-name: sbSlideIn;
            animation-iteration-count: 1;
            animation-timing-function: ease;
            animation-duration: 300ms;
        }

        @keyframes sbSlideIn {
            0% {
                transform: translate(0px, 0%);
            }
            100% {
                transform: translate(0px, -100%);
            }
        }

        #sb-sticky-referral-widget.slide-out {
            transform: translate(-100%, 0px);
            animation-name: sbSlideOut;
            animation-iteration-count: 1;
            animation-timing-function: ease;
            animation-duration: 300ms;
        }

        @keyframes sbSlideOut {
            0% {
                transform: translate(0px, -100%);
            }
            100% {
                transform: translate(0px, 0%);
            }
        }
            
        @media (max-width: 640px) {
            #sb-sticky-referral-widget {
                max-width: 90% !important;
                left: 5% !important;
            }
        }
            
        svg {
            display: block; /* Ensure it's visible */
            width: 24px;
            height: 24px;
        }`
      styleTag.textContent = materialCSSString
      head.append(styleTag)
    }
  })()
  