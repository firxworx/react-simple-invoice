import React, { Component } from 'react'
import { MdAddCircle as AddIcon, MdCancel as DeleteIcon } from 'react-icons/md'
import styles from './Invoice.module.scss'

class Invoice extends Component {

  locale = 'en-US'
  currency = 'USD'

  state = {
    taxRate: 0.00,
    lineItems: [
      {
        name: '',
        description: '',
        quantity: 0,
        price: 0.00,
      },
    ]
  }

  handleInvoiceChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLineItemChange = (elementIndex) => (event) => {

    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })

    this.setState({lineItems})

  }

  handleAddLineItem = (event) => {

    this.setState({
      lineItems: this.state.lineItems.concat(
        [{ name: '', description: '', quantity: 0, price: 0.00 }]
      )
    })

  }

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handleFocusSelect = (event) => {
    event.target.select()
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100)
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
  }

  calcTaxTotal = () => {
    return this.calcLineItemsTotal() * (this.state.taxRate / 100)
  }

  calcGrandTotal = () => {
    return this.calcLineItemsTotal() + this.calcTaxTotal()
  }

  render = () => {
    return (

      <div className={styles.invoice}>
        <div className={styles.brand}>
          <img src="https://via.placeholder.com/150x50.png?text=logo" alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.addresses}>
          <div className={styles.from}>
            <strong>Amazing Company</strong><br />
              123 Kensington Ave<br />
              Toronto, ON, Canada &nbsp;A1B2C3<br />
              416-555-1234
          </div>
          <div>
            <div className={`${styles.valueTable} ${styles.to}`}>
              <div className={styles.row}>
                <div className={styles.label}>Customer #</div>
                <div className={styles.value}>123456</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Invoice #</div>
                <div className={styles.value}>123456</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Date</div>
                <div className={`${styles.value} ${styles.date}`}>2019-01-01</div>
              </div>
            </div>
          </div>
        </div>
        <h2>Invoice</h2>
        <form>
            <div className={styles.lineItems}>
              <div className={`${styles.gridTable}`}>
                <div className={`${styles.row} ${styles.header}`}>
                  <div>#</div>
                  <div>Item</div>
                  <div>Description</div>
                  <div>Qty</div>
                  <div>Price</div>
                  <div>Total</div>
                  <div></div>
                </div>
                {this.state.lineItems.map((item, i) => (
                  <div className={`${styles.row} ${styles.editable}`} key={i}>
                    <div>{i+1}</div>
                    <div><input name="name" type="text" value={item.name} onChange={this.handleLineItemChange(i)} /></div>
                    <div><input name="description" type="text" value={item.description} onChange={this.handleLineItemChange(i)} /></div>
                    <div><input name="quantity" type="number" step="1" value={item.quantity} onChange={this.handleLineItemChange(i)} onFocus={this.handleFocusSelect} /></div>
                    <div className={styles.currency}><input name="price" type="number" step="0.01" min="0.00" max="9999999.99" value={item.price} onChange={this.handleLineItemChange(i)} onFocus={this.handleFocusSelect} /></div>
                    <div className={styles.currency}>{this.formatCurrency( item.quantity * item.price )}</div>
                    <div>
                      <button type="button"
                        className={styles.deleteItem}
                        onClick={this.handleRemoveLineItem(i)}
                      ><DeleteIcon size="1.25em" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.addItem}><button type="button" onClick={this.handleAddLineItem}><AddIcon size="1.25em" className={styles.addIcon} /> Add Item</button></div>
            </div>
        </form>

        <div className={styles.totalContainer}>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Tax Rate (%)</div>
                <div className={styles.value}><input name="taxRate" type="number" step="0.01" value={this.state.taxRate} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} /></div>
              </div>
            </div>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Subtotal</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Tax ({this.state.taxRate}%)</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total Due</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcGrandTotal())}</div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.pay}>
          <button className={styles.payNow}>Pay Now</button>
        </div>

        <div className={styles.footer}>
          <div className={styles.comments}>
            <h4>Notes</h4>
            <div>By Kevin Firko, consulting developer at <a href="https://bitcurve.com">Bitcurve Systems</a>. Check out my blog: <a href="https://firxworx.com">https://firxworx.com</a>. Available for hire!</div>
          </div>
          <div className={styles.closing}>
            <div>Thank-you for your business</div>
          </div>
        </div>

      </div>

    )
  }

}

export default Invoice
