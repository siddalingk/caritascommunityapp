(function (module) {
    mifosX.controllers = _.extend(module, {
        SmsController: function (scope, resourceFactory, location) {
            scope.offices = [];
            scope.clients = [];
            scope.submt = false;
            scope.officeId1=1
            scope.hjk = false;
            scope.formData={};
            scope.mobileNo={};
            scope
            scope.selected=false;
            scope.client=[];


            resourceFactory.officeResource.getAllOffices(function (data) {
                scope.offices = data;
                scope.formData = {
                    officeId: scope.offices[0].id
                }
            });

            scope.addClient = function () {
                for (var i in this.formData.id) {
                    for (var j in scope.clients) {
                        if (scope.clients[j].id == this.formData.id[i]) {
                            var temp = {};
                            temp.id = this.formData.id[i];
                            temp.mobileNo=scope.clients[j].mobileNo;
                            temp.displayName = scope.clients[j].displayName;
                            scope.client.push(temp);
                            scope.clients.splice(j, 1);
                        }

                    }
                }

            };

            scope.removeClient = function () {
                for (var i in this.formData.client) {
                    for (var j in scope.client) {
                        if (scope.client[j].id == this.formData.client[i]) {
                            var temp = {};
                            temp.id = this.formData.client[i];
                            temp.displayName = scope.client[j].displayName;
                            temp.mobileNo=    scope.client[j].mobileNo;
                            scope.clients.push(temp);
                            scope.client.splice(j, 1);
                        }
                    }
                }
            };

            scope.select=function(){
                scope.selected=false;
                scope.mobileNo=scope.formData.id;
                scope.formData.mobileNo=scope.mobileNo;

            }

            scope.selectAll = function(){
                scope.selected=true;
                for (var l in scope.clients) {
                    var temp = {};
                    temp.id = scope.clients[l].id;
                    temp.displayName = scope.clients[l].displayName;
                    temp.mobileNo=    scope.clients[l].mobileNo;
                    scope.client.push(temp);
                }
                //scope.client= scope.mobileNo;
                scope.clients=[];
            }

            scope.clear=function(){
                for (var l in scope.client) {
                    var temp = {};
                    temp.id = scope.client[l].id;
                    temp.displayName = scope.client[l].displayName;
                    temp.mobileNo=    scope.client[l].mobileNo;
                    scope.clients.push(temp);
                }
                scope.client=[];
                scope.selected=false;
                scope.formData.mobileNo=" ";
                scope.formData.id="";
                //scope.clients=scope.formData.client;
            }
            scope.cancle=function(){
                //scope.selected=false;
                scope.formData.messageText=" ";
            }
            var param={};
            param.officeId=scope.officeId1;
            var items = resourceFactory.clientResource.getAllClients(param, function (data) {
                scope.totalClients = data.totalFilteredRecords;
                scope.clients = data.pageItems;
            });


                     scope.fetchClientByOfficeId = function (officeId) {
                         scope.officeId1 = officeId;
                         var params={};
                         params.officeId=officeId;
                         scope.formData.mobileNo="";
                         scope.hjk = true;
                         var items = resourceFactory.clientResource.getAllClients(params, function (data) {
                             scope.totalClients = data.totalFilteredRecords;
                             scope.clients = data.pageItems;
                         });

                         scope.client=[];
                 }

            }


    });
    mifosX.ng.application.controller('SmsController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.SmsController]).run(function ($log) {
        $log.info("SmsController initialized");
    });
}(mifosX.controllers || {}));