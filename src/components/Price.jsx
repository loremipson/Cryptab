import React from 'react'
import PropTypes from 'prop-types'

const Price = ({ amount, shorten, ...other }) => {
  const thousand = 1000
  const million = 1000000
  const billion = 1000000000

  let formatted = false

  if (shorten && amount / billion > 1) {
    formatted = `${(amount / billion).toFixed(2)}B`
  } else if (shorten && amount / million > 1) {
    formatted = `${(amount / million).toFixed(2)}M`
  } else if (shorten && amount / thousand > 1) {
    formatted = `${(amount / thousand).toFixed(2)}K`
  } else {
    formatted = (amount).toFixed(2);
  }
  return (
    <div {...other}>
      ${formatted.replace(/\d(?=(\d{3})+\.)/g, '$&,')}
    </div>
  )
}

Price.defaultProps = {
  shorten: false,
}

Price.propTypes = {
  amount: PropTypes.number.isRequired,
  shorten: PropTypes.bool,
}

export default Price
