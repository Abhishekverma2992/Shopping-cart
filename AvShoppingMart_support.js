angular.module('shoppingCart', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/home", {
                redirectTo: "/"
            })
            .when("/aboutUs", {
                templateUrl: "aboutus.html"
            })
            .when("/contactUs", {
                templateUrl: "contactus.html"
            })
            .when("/cart", {
                templateUrl: "cart.html"

            })

    })
    .controller('myController', ['$scope', '$http', function($scope, $http) {
        $scope.cart = [];
        $scope.quantity = 1;
        $scope.newPrice = 0;
        $http.get('another.json').success(function(data) {
            $scope.items = data;
            console.log('items:', data);
        });

        $scope.list = [{
            id: 1,
            name: "psycho cybernetics",
            price: 250,
            writer: "maxwell maltz",
            description: "awesome book on psychology",
            img: "psycocybernetics.jpg"
        }];

        $scope.optionList = ['cars', 'Books', 'Electronics'];

        $scope.saveBook = function(book) {
            alert("book added");
            $scope.newUser.name = book.name;
            $scope.newUser.price = book.price;
            $scope.newUser.writer = book.writer;
            $scope.newUser.description = book.description;
            $scope.list.push(newUser);
        };
        $scope.showMe = false;
        $scope.showMeField = function() {
            $scope.showMe = true;
        };

        $scope.remove = function(book) {
            $scope.list = $scope.list.filter(
                function(eachPerson) {
                    return eachPerson.name !== book.name;
                }
            );
        };

        $scope.edit = function(book) {
            alert = "are you admin ?";
            $scope.current = book;
            $scope.editedUser = {
                name: " ",
                price: " ",
                writer: " ",
                description: " "
            };
            $scope.editedUser.name = book.name;
            $scope.editedUser.price = book.price;
            $scope.editedUser.writer = book.writer;
            $scope.editedUser.description = book.description;
        };

        $scope.editedUser = undefined;

        $scope.save = function(book) {
            $scope.current.name = book.name;
            $scope.current.price = book.price;
            $scope.current.writer = book.writer;
            $scope.current.description = book.description;

            $scope.editedUser = undefined;
        };


        $scope.cancel = function() {

            $scope.editedUser = undefined;
        };



        $scope.addToCart = function(items) {
            var found = false;
            $scope.cart.forEach(function(item) {
                if (item.id === items.id | item.name===items.name) {
                    item.quantity++;
                    item.newPrice = (item.quantity * item.price);

                    found = true;
                }
            });
            if (!found) {
                $scope.cart.push(angular.extend({
                    quantity: 1,
                    newPrice: items.price
                }, items));
                console.log(items);
            }
        };
        $scope.handleChange = function() {
            alert("product list had changed" );
            
        };

        $scope.totalPrice = function() {
            var total = 0;
            $scope.cart.forEach(function(item) {
                total += (item.price * item.quantity);
            })
            return total;
        };


    }]);
