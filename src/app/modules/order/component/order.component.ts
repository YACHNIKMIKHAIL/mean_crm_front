import { Component } from "@angular/core";

@Component({
      selector: "crm-order",
      templateUrl: "./order.component.html",
      styleUrls: ["./order.component.css"],
})
export class OrderComponent {
      ordersList: {
            title: string;
            imageSrc: string;
      }[] = [
            {
                  title: "Name of category 1",
                  imageSrc: "https://i.guim.co.uk/img/media/f515dd3c8ce481073c7671b4e6f4014f31a88e15/166_209_5306_3183/master/5306.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=48b4da7b751e44e6566f58f2328a5e7a",
            },
            {
                  title: "Name of category 2",
                  imageSrc: "https://i.guim.co.uk/img/media/f515dd3c8ce481073c7671b4e6f4014f31a88e15/166_209_5306_3183/master/5306.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=48b4da7b751e44e6566f58f2328a5e7a",
            },
            {
                  title: "Name of category 2",
                  imageSrc: "https://i.guim.co.uk/img/media/f515dd3c8ce481073c7671b4e6f4014f31a88e15/166_209_5306_3183/master/5306.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=48b4da7b751e44e6566f58f2328a5e7a",
            },
            {
                  title: "Name of category 3",
                  imageSrc: "https://i.guim.co.uk/img/media/f515dd3c8ce481073c7671b4e6f4014f31a88e15/166_209_5306_3183/master/5306.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=48b4da7b751e44e6566f58f2328a5e7a",
            },
            {
                  title: "Name of category 4",
                  imageSrc: "https://i.guim.co.uk/img/media/f515dd3c8ce481073c7671b4e6f4014f31a88e15/166_209_5306_3183/master/5306.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=48b4da7b751e44e6566f58f2328a5e7a",
            },
      ];

      trackByIndex(index: number) {
            return index;
      }
}
