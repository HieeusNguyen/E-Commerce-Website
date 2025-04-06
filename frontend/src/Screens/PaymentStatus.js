import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const status = "success"; 
  const isSuccess = status === 'success';

  return (
    <div className="status-container">
      <div className="status-card">
        <div className={`status-circle ${isSuccess ? 'success' : 'failure'}`}>
          {isSuccess ? '✓' : '✗'}
        </div>
        <h1 className={isSuccess ? 'success-text' : 'failure-text'}>
          {isSuccess ? 'Thanh Toán Thành Công!' : 'Thanh Toán Thất Bại'}
        </h1>
        <p>
          {isSuccess 
            ? 'Cảm ơn bạn đã thực hiện giao dịch.' 
            : 'Đã có lỗi xảy ra trong quá trình thanh toán.'}
        </p>
        <p>
          {isSuccess 
            ? `Mã giao dịch: #${Math.floor(Math.random() * 1000000)}` 
            : `Mã lỗi: ERR-${Math.floor(Math.random() * 1000)}`}
        </p>
        <div className="status-details">
          <p>
            {isSuccess 
              ? '' 
              : 'Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.'}
          </p>
          {isSuccess}
        </div>
        <div className="button-group">
          {!isSuccess && (
            <Link to="/payment" className="retry-button">
              Thử lại
            </Link>
          )}
          <Link to="/" className="home-button">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;