export class OrderDto {
  status: string;
  courierId: number;
  customerName: string;
  customerPhone: string;
  comment: string;
  id: number;

  private constructor(
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
    status: string,
    courierId: number,
  ) {
    this.status = status;
    this.courierId = courierId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.comment = comment;
    this.id = id;
  }
  static createOrderWithRandomData(): OrderDto {
    return new OrderDto(
      'John Smith',
      '+1234567',
      'Test comment',
      Math.floor(Math.random() * 100),
      'OPEN',
      Math.floor(Math.random() * 100),
    );
  }
}
