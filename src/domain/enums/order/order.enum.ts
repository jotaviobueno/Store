import { registerEnumType } from '@nestjs/graphql';

export enum ORDER_ENUM {
  charge = 'charge',
  payment = 'payment',
  payment_failure_refund = 'payment_failure_refund',
  payment_refund = 'payment_refund',
  refund = 'refund',
  refund_failure = 'refund_failure',
  //
  adjustment = 'adjustment',
  anticipation_repayment = 'anticipation_repayment',
  balance_transfer_inbound = 'balance_transfer_inbound',
  balance_transfer_outbound = 'balance_transfer_outbound',
  contribution = 'contribution',
  payout = 'payout',
  payout_cancel = 'payout_cancel',
  payout_failure = 'payout_failure',
  reserved_funds = 'reserved_funds',
  stripe_fee = 'stripe_fee',
  stripe_fx_fee = 'stripe_fx_fee',
  tax_fee = 'tax_fee',
  topup = 'topup',
  topup_reversal = 'topup_reversal',
  //
  issuing_authorization_hold = 'issuing_authorization_hold',
  issuing_authorization_release = 'issuing_authorization_release',
  issuing_disbursement = 'issuing_disbursement',
  issuing_dispute = 'issuing_dispute',
  issuing_transaction = 'issuing_transaction',
  issuing_transfer_inbound = 'issuing_transfer_inbound',
  issuing_transfer_outbound = 'issuing_transfer_outbound',
  issuing_transfer_reversal_inbound = 'issuing_transfer_reversal_inbound',
  issuing_transfer_reversal_outbound = 'issuing_transfer_reversal_outbound',
  //
  advance = 'advance',
  advance_funding = 'advance_funding',
  application_fee = 'application_fee',
  application_fee_refund = 'application_fee_refund',
  connect_collection_transfer = 'connect_collection_transfer',
  reserve_transaction = 'reserve_transaction',
  transfer = 'transfer',
  transfer_cancel = 'transfer_cancel',
  transfer_failure = 'transfer_failure',
  transfer_refund = 'transfer_refund',
}

registerEnumType(ORDER_ENUM, {
  name: 'ORDER_ENUM',
});
