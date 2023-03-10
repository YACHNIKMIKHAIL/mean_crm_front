export interface PositionInterface {
      name: string;
      cost: number;
      category: string;
      user?: string;
      _id?: string;
}

export interface PositionWithQuantityInterface extends PositionInterface {
      quantity?: number;
}

export interface OrderInterface {
      date?: Date;
      order?: number;
      list: PositionWithQuantityInterface[];
      user?: string;
      _id?: string;
}
