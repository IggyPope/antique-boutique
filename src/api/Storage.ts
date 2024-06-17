import { STORAGE_KEYS } from '@/constants/app';

export class StorageApi<D> implements IStore<D> {
  constructor(
    private readonly storage: Storage,
    private readonly key: (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS],
  ) {}

  public saveData(data: unknown) {
    this.storage.setItem(this.key, JSON.stringify(data));
  }

  public getData(): D | null {
    const data: string | null = this.storage.getItem(this.key);

    return data ? (JSON.parse(data) as D) : null;
  }

  public removeData(): void {
    this.storage.removeItem(this.key);
  }
}

interface IStore<G> {
  getData: () => G | null;

  saveData: (data: G) => void;

  removeData: () => void;
}
