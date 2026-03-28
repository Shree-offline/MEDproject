# Initial inventory
inventory = {
    "Paracetamol": 50,
    "Ibuprofen": 30,
    "Vitamin C": 100
}

ADMIN_PASSWORD = "admin123"  # change this password

def admin_panel():
    password = input("Enter admin password: ").strip()
    if password != ADMIN_PASSWORD:
        print("Access denied! Incorrect password.")
        return

    print("\n--- Admin Panel ---")
    print("Current Stock:")
    for med, qty in inventory.items():
        print(f"- {med}: {qty}")

    item = input("\nEnter medicine name to restock: ").strip().title()

    try:
        qty = int(input(f"Enter quantity to add for {item}: "))
        if qty <= 0:
            print("Quantity must be greater than 0.")
            return
    except ValueError:
        print("Invalid quantity. Please enter a number.")
        return

    if item in inventory:
        inventory[item] += qty
    else:
        inventory[item] = qty

    print(f"Stock updated! {item} now has {inventory[item]} units.")

def user_shop():
    print("\n--- User: Shop Medicines ---")
    print("Available Medicines:")
    for med in inventory:
        print(f"- {med}")

    item = input("What would you like to buy? ").strip().title()

    if item not in inventory or inventory[item] == 0:
        print("Item not found or out of stock.")
        return

    try:
        qty = int(input(f"How many {item} do you need? "))
        if qty <= 0:
            print("Quantity must be greater than 0.")
            return
    except ValueError:
        print("Invalid quantity. Please enter a number.")
        return

    if qty <= inventory[item]:
        inventory[item] -= qty
        print(f"Purchase successful! Remaining {item}: {inventory[item]}")
    else:
        print(f"Sorry, only {inventory[item]} units available.")

# Main Loop
while True:
    print("\n1. Admin (View & Restock Stock)")
    print("2. User (Buy Medicine)")
    print("3. Exit")

    choice = input("Select an option: ").strip()

    if choice == '1':
        admin_panel()
    elif choice == '2':
        user_shop()
    elif choice == '3':
        print("System closed.")
        break
    else:
        print("Invalid choice.")
