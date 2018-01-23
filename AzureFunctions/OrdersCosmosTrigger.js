/*
	OrdersCosmosTrigger function code
	* Trigger: Azure Cosmos DB on newOrders into the orders collection.
	* Output: Azure Storage Queue - orderqueue
	
	Triggers whenever a document in the orders collection is inserted or updated.
	By checking processed on the document, we only send unprocessed orders to the queue,
	so when the next Function updates the processed value to true, it won't be requeued.
*/
module.exports = function (context, newOrders) {
	for(var i=0; i < newOrders.length; i++) {
		var newOrder = newOrders[i];
		var orderId = newOrder['$v']['id']['$v'];
		var userId = newOrder['$v']['userId']['$v'];
		var sendNotification = newOrder['$v']['sendNotification']['$v'];
		var processed = newOrder['$v']['processed']['$v'];
		if (!processed) {
			context.log('Sending order to orderqueue for order id ', orderId);
			context.bindings.outputQueue = {
				orderId: orderId,
				userId: userId,
				sendNotification: sendNotification
			};
		}
		else {
			context.log('Already processed, not sent to orderqueue for order id ', orderId);
		}
    }
	context.done();
}