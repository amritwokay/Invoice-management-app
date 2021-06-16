package com.milestone2;

import java.sql.Date;

public class Pojo {
	
	private String businessCode,custName,customerPaymentTerms,areaBusiness,documentType,invoiceCurrency,custNumber,notes;
	private Date clearDate,baseLineCreateDate,dueInDate,documentCreateDate,postingDate;
	private int isOpen;
	private float postingId,businessYear;
	private double totalOpenAmount,docId,invoiceId;
	
	public Pojo() {
		// Default constructor
	}

	public String getBusinessCode() {
		return businessCode;
	}

	public void setBusinessCode(String businessCode) {
		this.businessCode = businessCode;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustomerPaymentTerms() {
		return customerPaymentTerms;
	}

	public void setCustomerPaymentTerms(String customerPaymentTerms) {
		this.customerPaymentTerms = customerPaymentTerms;
	}

	public String getAreaBusiness() {
		return areaBusiness;
	}

	public void setAreaBusiness(String areaBusiness) {
		this.areaBusiness = areaBusiness;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public String getInvoiceCurrency() {
		return invoiceCurrency;
	}

	public void setInvoiceCurrency(String invoiceCurrency) {
		this.invoiceCurrency = invoiceCurrency;
	}

	public String getCustNumber() {
		return custNumber;
	}

	public void setCustNumber(String custNumber) {
		this.custNumber = custNumber;
	}

	public Date getClearDate() {
		return clearDate;
	}

	public void setClearDate(Date clearDate) {
		this.clearDate = clearDate;
	}

	public Date getBaseLineCreateDate() {
		return baseLineCreateDate;
	}

	public void setBaseLineCreateDate(Date baseLineCreateDate) {
		this.baseLineCreateDate = baseLineCreateDate;
	}

	public Date getDueInDate() {
		return dueInDate;
	}

	public void setDueInDate(Date dueInDate) {
		this.dueInDate = dueInDate;
	}

	public Date getDocumentCreateDate() {
		return documentCreateDate;
	}

	public void setDocumentCreateDate(Date documentCreateDate) {
		this.documentCreateDate = documentCreateDate;
	}

	public Date getPostingDate() {
		return postingDate;
	}

	public void setPostingDate(Date postingDate) {
		this.postingDate = postingDate;
	}

	public int getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(int isOpen) {
		this.isOpen = isOpen;
	}

	public float getPostingId() {
		return postingId;
	}

	public void setPostingId(float postingId) {
		this.postingId = postingId;
	}

	public float getBusinessYear() {
		return businessYear;
	}

	public void setBusinessYear(float businessYear) {
		this.businessYear = businessYear;
	}

	public double getTotalOpenAmount() {
		return totalOpenAmount;
	}

	public void setTotalOpenAmount(double totalOpenAmount) {
		this.totalOpenAmount = totalOpenAmount;
	}

	public double getDocId() {
		return docId;
	}

	public void setDocId(double docId) {
		this.docId = docId;
	}

	public double getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(double invoiceId) {
		this.invoiceId = invoiceId;
	}
	
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	
	}