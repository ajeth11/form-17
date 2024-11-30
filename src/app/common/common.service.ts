import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  storeDataDetails = signal<Array<any>>([]);

  getStoreDataDetails() {
    const currentData = this.storeDataDetails();
    const sortedData = currentData.sort((a, b) => a.id - b.id);
    return sortedData;
  }

  saveStoreDataDetails(inputArray: { first: string; last: string; email: string; mobile: string; profile: string; id: number }[]) {
    this.storeDataDetails.set(inputArray);
  }

  updateStoreDataDetails(uniqueID: number, updatedData: { first?: string; last?: string; email?: string; mobile?: string; profile?: string }) {
    this.storeDataDetails.update((currentData) => {
      return currentData.map(data =>
        data.id === uniqueID ? { ...data, ...updatedData } : data
      );
    });
  }

  // Function to delete a user by ID
  deleteStoreDataDetails(userId: number) {
    this.storeDataDetails.update((currentData) => {
      return currentData.filter(user => user.id !== userId);
    });
  }
}
