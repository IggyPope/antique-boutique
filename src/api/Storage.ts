export class LocalStorageApi<D> implements IStore<D> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  public saveData(data: unknown) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  public getData(): D | null {
    const data: string | null = localStorage.getItem(this.key);

    return data ? (JSON.parse(data) as D) : null;
  }

  public removeData(): void {
    localStorage.removeItem(this.key);
  }
}

interface IStore<G> {
  getData: () => G | null;

  saveData: (data: G) => void;

  removeData: () => void;
}
