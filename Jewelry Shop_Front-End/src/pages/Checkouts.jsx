import { useState } from "react";
import "../style/OrderDetail.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Checkouts = () => {
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPhoneValue, setInputPhoneValue] = useState("");
  const [inputAddressValue, setInputAddressValue] = useState("");

  const handleInputChange = (e, setInput) => {
    const modifiedValue =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);

    setInput(modifiedValue);
  };
  const handleSubmitOrder = (e) => {
    if (
      !inputAddressValue ||
      !inputPhoneValue ||
      !inputEmailValue ||
      !inputNameValue
    ) {
      e.preventDefault();
      toast.error('Input all fields');
    }
  };
  return (
    <div className="flexbox">
      <div className="content">
        <div className="wrap">
          <div className="sidebar">
            <div className="sidebar-content">
              <div className="order-summary order-summary-is-collapsed">
                <h2 className="visually-hidden">Thông tin đơn hàng</h2>
                <div className="order-summary-sections">
                  <div
                    className="order-summary-section order-summary-section-product-list"
                    data-order-summary-section="line-items"
                  >
                    <table className="product-table">
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className="visually-hidden">Hình ảnh</span>
                          </th>
                          <th scope="col">
                            <span className="visually-hidden">Mô tả</span>
                          </th>
                          <th scope="col">
                            <span className="visually-hidden">Số lượng</span>
                          </th>
                          <th scope="col">
                            <span className="visually-hidden">Giá</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          className="product"
                          data-product-id="1041518282"
                          data-variant-id="1090587759"
                        >
                          <td className="product-image">
                            <div className="product-thumbnail">
                              <div className="product-thumbnail-wrapper">
                                <img
                                  className="product-thumbnail-image"
                                  alt="Dây chuyền bạc mạ vàng hồng 14k mặt hình chữ O với họa tiết trái tim trong suốt"
                                  src="//product.hstatic.net/200000103143/product/anyconv.com__566_4dab5265aee2459cb486e3d35fee1123_198fd7fe4a3444519d5f2b6d05c59471_small.png"
                                />
                              </div>
                              <span
                                className="product-thumbnail-quantity"
                                aria-hidden="true"
                              >
                                1
                              </span>
                            </div>
                          </td>
                          <td className="product-description">
                            <span className="product-description-name order-summary-emphasis">
                              Dây chuyền bạc mạ vàng hồng 14k mặt hình chữ O với
                              họa tiết trái tim trong suốt
                            </span>

                            <span className="product-description-variant order-summary-small-text">
                              45 / Hồng / Mạ vàng hồng 14K
                            </span>
                          </td>
                          <td className="product-quantity visually-hidden">
                            1
                          </td>
                          <td className="product-price">
                            <span className="order-summary-emphasis">
                              5,390,000₫
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="order-summary-section order-summary-section-total-lines payment-lines"
                    data-order-summary-section="payment-lines"
                  >
                    <table className="total-line-table">
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className="visually-hidden">Mô tả</span>
                          </th>
                          <th scope="col">
                            <span className="visually-hidden">Giá</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="total-line total-line-subtotal">
                          <td className="total-line-name">Tạm tính</td>
                          <td className="total-line-price">
                            <span
                              className="order-summary-emphasis"
                              data-checkout-subtotal-price-target="539000000"
                            >
                              5,390,000₫
                            </span>
                          </td>
                        </tr>
                        <tr className="total-line total-line-shipping">
                          <td className="total-line-name">Phí vận chuyển</td>
                          <td className="total-line-price">
                            <span
                              className="order-summary-emphasis"
                              data-checkout-total-shipping-target="0"
                            >
                              —
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="total-line-table-footer">
                        <tr className="total-line">
                          <td className="total-line-name payment-due-label">
                            <span className="payment-due-label-total">
                              Tổng cộng
                            </span>
                          </td>
                          <td className="total-line-name payment-due">
                            <span className="payment-due-currency">VND</span>
                            <span
                              className="payment-due-price"
                              data-checkout-payment-due-target="539000000"
                            >
                              5,390,000₫
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main">
            <div className="main-header">
              <a href="/" className="logo">
                <h1 className="logo-text">Jewerly Shop</h1>
              </a>

              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/cart">Giỏ hàng</a>
                </li>

                <li className="breadcrumb-item breadcrumb-item-current">
                  Thông tin giao hàng
                </li>
              </ul>
            </div>
            <div className="main-content">
              <div
                id="checkout_order_information_changed_error_message"
                className="hidden"
                style={{ marginBottom: "15px" }}
              >
                <p className="field-message field-message-error alert alert-danger">
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 286.054 286.054"
                    style={{ enableBackground: "new 0 0 286.054 286.054" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        style={{ fill: "#E2574C" }}
                        d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027 c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236 c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209 S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972 c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723 c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843 C160.878,195.732,152.878,187.723,143.036,187.723z"
                      />
                    </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                    <g> </g>
                  </svg>
                  <span></span>
                </p>
              </div>
              <div className="step">
                <div className="step-sections steps-onepage" step="1">
                  <div className="section">
                    <div className="section-header">
                      <h2 className="section-title">Thông tin giao hàng</h2>
                    </div>
                    <div className="section-content section-customer-information no-mb">
                      <p className="section-content-text">
                        Bạn đã có tài khoản?
                        <a href="/account/login?urlredirect=%2Fcheckouts%2Fe0002523e9d04c87982765859ff95a08%3Fstep%3D1">
                          Đăng nhập
                        </a>
                      </p>

                      <div className="fieldset">
                        <div className="field field-required  ">
                          <div className="field-input-wrapper">
                            <label
                              className="field-label"
                              htmlFor="billing_address_full_name"
                            >
                              Họ và tên
                            </label>
                            <input
                              placeholder="Họ và tên"
                              spellCheck="false"
                              className="field-input"
                              size="30"
                              type="text"
                              id="billing_address_full_name"
                              name="billing_address[full_name]"
                              autoComplete="false"
                              value={inputNameValue}
                              onChange={(e) => {
                                handleInputChange(e, setInputNameValue);
                              }}
                            />
                          </div>
                        </div>

                        <div className="field field-required field-two-thirds  ">
                          <div className="field-input-wrapper">
                            <label
                              className="field-label"
                              htmlFor="checkout_user_email"
                            >
                              Email
                            </label>
                            <input
                              autoComplete="false"
                              placeholder="Email"
                              autoCapitalize="off"
                              spellCheck="false"
                              className="field-input"
                              size="30"
                              type="email"
                              id="checkout_user_email"
                              name="checkout_user[email]"
                              value={inputEmailValue}
                              onChange={(e) => {
                                handleInputChange(e, setInputEmailValue);
                              }}
                            />
                          </div>
                        </div>

                        <div className="field field-required field-third  ">
                          <div className="field-input-wrapper">
                            <label
                              className="field-label"
                              htmlFor="billing_address_phone"
                            >
                              Số điện thoại
                            </label>
                            <input
                              autoComplete="false"
                              placeholder="Số điện thoại"
                              autoCapitalize="off"
                              spellCheck="false"
                              className="field-input"
                              size="30"
                              maxLength="15"
                              type="tel"
                              id="billing_address_phone"
                              name="billing_address[phone]"
                              value={inputPhoneValue}
                              onChange={(e) => {
                                handleInputChange(e, setInputPhoneValue);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section-content">
                      <div className="fieldset">
                        <form
                          autoComplete="off"
                          id="form_update_shipping_method"
                          className="field default ms-0"
                          acceptCharset="UTF-8"
                          method="post"
                        >
                          <input name="utf8" type="hidden" value="✓" />
                          <div className="content-box mt0">
                            <div
                              id="form_update_location_customer_shipping"
                              className="order-checkout__loading radio-wrapper content-box-row content-box-row-padding content-box-row-secondary "
                              htmlFor="customer_pick_at_location_false"
                            >
                              <input name="utf8" type="hidden" value="✓" />
                              <div className="order-checkout__loading--box">
                                <div className="order-checkout__loading--circle"></div>
                              </div>

                              <div className="field field-required">
                                <div className="field-input-wrapper">
                                  <label
                                    className="field-label"
                                    htmlFor="billing_address_address1"
                                  >
                                    Địa chỉ
                                  </label>
                                  <input
                                    placeholder="Địa chỉ"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    className="field-input"
                                    size="30"
                                    type="text"
                                    id="billing_address_address1"
                                    name="billing_address[address1]"
                                    value={inputAddressValue}
                                    onChange={(e) => {
                                      handleInputChange(
                                        e,
                                        setInputAddressValue
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div id="change_pick_location_or_shipping">
                        <div id="section-payment-method" className="section">
                          <div className="order-checkout__loading--box">
                            <div className="order-checkout__loading--circle"></div>
                          </div>
                          <div className="section-header">
                            <h2 className="section-title">
                              Phương thức thanh toán
                            </h2>
                          </div>
                          <div className="section-content">
                            <div className="content-box">
                              <div className="radio-wrapper content-box-row">
                                <label
                                  className="radio-label"
                                  htmlFor="payment_method_id_1002364966"
                                >
                                  <div className="radio-input payment-method-checkbox">
                                    <input
                                      id="payment_method_id_1002364966"
                                      className="input-radio"
                                      name="payment_method_id"
                                      type="radio"
                                      value="1002364966"
                                      checked="true"
                                    />
                                  </div>
                                  <div className="radio-content-input">
                                    <img
                                      className="main-img"
                                      src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=5"
                                    />
                                    <div>
                                      <span className="radio-label-primary">
                                        Chuyển khoản qua ngân hàng
                                      </span>
                                      <span className="quick-tagline hidden"></span>
                                    </div>
                                  </div>
                                </label>
                              </div>
                              <div
                                className="radio-wrapper content-box-row content-box-row-secondary "
                                htmlFor="payment_method_id_1002364966"
                              >
                                <div className="blank-slate">
                                  Quý khách hàng vui lòng chuyển khoản theo
                                  thông tin sau: - Nội dung chuyển khoản: Thanh
                                  toán cho mã đơn hàng [Mã đơn hàng của bạn] Mã
                                  đơn hàng của bạn sẽ hiển thị khi bấm Hoàn tất
                                  đơn hàng
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="step-footer" id="step-footer-checkout">
                        <form
                          id="form_next_step"
                          acceptCharset="UTF-8"
                          method="post"
                        >
                          <input name="utf8" type="hidden" value="✓" />
                          <form
                            id="createOrder"
                            action="http://localhost:9999/api/v1/payment/create_payment_url"
                            method="POST"
                            target="_blank"
                          >
                            <input
                              type="text"
                              style={{ display: "none" }}
                              value={30000}
                              name="amount"
                            />
                            <button
                              type="submit"
                              className="step-footer-continue-btn"
                              style={{
                                display: "inline-block",
                                borderRadius: "4px",
                                fontWeight: "500",
                                padding: "1.4em 1.7em",
                                boxSizing: "border-box",
                                textAlign: "center",
                                cursor: "pointer",
                                transition:
                                  "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
                                position: "relative",
                                background: "#338dbc",
                                color: "white",
                              }}
                              onClick={(e) => handleSubmitOrder(e)}
                            >
                              <span className="btn-content">
                                Hoàn tất đơn hàng
                              </span>
                              <i className="btn-spinner icon icon-button-spinner"></i>
                            </button>
                          </form>
                        </form>
                        <a className="step-footer-previous-link" href="/cart">
                          Giỏ hàng
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="hrv-coupons-popup-site-overlay"></div>
                  <div className="main-footer footer-powered-by">
                    Powered by SDN Group3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkouts;
