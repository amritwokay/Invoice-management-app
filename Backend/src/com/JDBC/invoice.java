package com.project;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class invoice {
	private String businessCode;
	private String custNumber;
	private String nameCustomer;
	private Date clearDate;
	private int businessYear;
	private long docId;
	private Date postingDate;
	private Date documentCreateDate;
	private Date dueDate;
	private String invoiceCurrency;
	private String documentType;
	private int postingId;
	private String areaBusiness;
	private double totalOpenAmount;
	private Date baselineCreateDate;
	private String custPaymentTerms;
	private long invoiceId;
	private int isOpen;
	public String getBusinessCode() {
		return businessCode;
	}
	public void setBusinessCode(String businessCode) {
		this.businessCode = businessCode;
	}
	public String getCustNumber() {
		return custNumber;
	}
	public void setCustNumber(String custNumber) {
		this.custNumber = custNumber;
	}
	public String getNameCustomer() {
		return nameCustomer;
	}
	public void setNameCustomer(String nameCustomer) {
		this.nameCustomer = nameCustomer;
	}
	public Date getClearDate() {
		return clearDate;
	}
	public void setClearDate(String clearDate) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		java.util.Date date = sdf.parse(clearDate);
		java.sql.Date sqlDate = new Date(date.getTime());
		this.clearDate = sqlDate;
	}
	public int getBusinessYear() {
		return businessYear;
	}
	public void setBusinessYear(Integer businessYear) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
		java.util.Date date = sdf.parse(businessYear.toString());
		java.sql.Date sqlDate = new Date(date.getTime());
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(sqlDate);
		this.businessYear = calendar.get(Calendar.YEAR);
	}
	public long getDocId() {
		return docId;
	}
	public void setDocId(long docId) {
		this.docId = docId;
	}
	public Date getPostingDate() {
		return postingDate;
	}
	public void setPostingDate(String postingDate) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date = sdf.parse(postingDate);
		java.sql.Date sqlDate = new Date(date.getTime());
		this.postingDate = sqlDate;
	}
	public Date getDocumentCreateDate() {
		return documentCreateDate;
	}
	public void setDocumentCreateDate(Integer documentCreateDate) throws ParseException {
		SimpleDateFormat originalFormat = new SimpleDateFormat("yyyyMMdd");
		java.util.Date date = originalFormat.parse(documentCreateDate.toString());
		java.sql.Date sqlDate = new Date(date.getTime());
		this.documentCreateDate = sqlDate;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Integer dueDate) throws ParseException {
		SimpleDateFormat originalFormat = new SimpleDateFormat("yyyyMMdd");
		java.util.Date date = originalFormat.parse(dueDate.toString());
		java.sql.Date sqlDate = new Date(date.getTime());
		this.dueDate = sqlDate;
	}
	public String getInvoiceCurrency() {
		return invoiceCurrency;
	}
	public void setInvoiceCurrency(String invoiceCurrency) {
		this.invoiceCurrency = invoiceCurrency;
	}
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public int getPostingId() {
		return postingId;
	}
	public void setPostingId(int postingId) {
		this.postingId = postingId;
	}
	public String getAreaBusiness() {
		return areaBusiness;
	}
	public void setAreaBusiness(String areaBusiness) {
		this.areaBusiness = areaBusiness;
	}
	public double getTotalOpenAmount() {
		return totalOpenAmount;
	}
	public void setTotalOpenAmount(double totalOpenAmount) {
		this.totalOpenAmount = totalOpenAmount;
	}
	public Date getBaselineCreateDate() {
		return baselineCreateDate;
	}
	public void setBaselineCreateDate(Integer baselineCreateDate) throws ParseException {
		SimpleDateFormat originalFormat = new SimpleDateFormat("yyyyMMdd");
		java.util.Date date = originalFormat.parse(baselineCreateDate.toString());
		java.sql.Date sqlDate = new Date(date.getTime());
		this.baselineCreateDate = sqlDate;
	}
	public String getCustPaymentTerms() {
		return custPaymentTerms;
	}
	public void setCustPaymentTerms(String custPaymentTerms) {
		this.custPaymentTerms = custPaymentTerms;
	}
	public long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(long invoiceId) {
		this.invoiceId = invoiceId;
	}
	public int getIsOpen() {
		return isOpen;
	}
	public void setIsOpen(int isOpen) {
		this.isOpen = isOpen;
	}
	
}

