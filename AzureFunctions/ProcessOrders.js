/*
	ProcessOrders function code
	* Trigger: Azure Storage Queue - orderqueue
	* Input: Azure Cosmos DB - orders collection
	* Input: Azure Cosmos DB - users collection
	* Output: Azure Storage Queue - notificationqueue
	
	Fires when items are added to the orderqueue. Pulls in the associated order and customer
	to see if a notification should be sent. If so, adds the order and customer ids to the 
	notificationqueue.
*/
module.exports = function (context, orderToProcess) {
    // Do order processing stuff...

    // Send notification that order processing is complete to customer.
	if (orderToProcess.sendNotification)  {
		var users = context.bindings.users;
		
        var notificationPhone = '';
        var firstName = '';
		for(var i=0; i < users.length; i++) {
			var user = users[i];
			if (user['$v']['email']['$v'] === orderToProcess.userId) {
				if (user['$v']['phone']) {
                    notificationPhone =  user['$v']['phone']['$v'];
                    firstName =  user['$v']['firstName']['$v'];
				}
			}
		}
		
		context.bindings.outputQueue = {
			orderId: orderToProcess.orderId,
			userId: orderToProcess.userId,
            notificationPhone: notificationPhone,
            firstName: firstName
		};
		context.log('Sent to notificationqueue for order id ', orderToProcess.orderId);
	}
	else {
		context.log('Notification not requested, not sent to notificationqueue for order id ', orderToProcess.orderId);
	}
	
    context.done();
}