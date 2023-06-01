import sys

if sys.version_info[0] < 3:
    input_func = raw_input
else:
    input_func = input

def evaluate_test_case(test_case, user_submission):
    test_case = test_case.lower()

    if test_case == "adding":
        try:
            if user_submission == 5:
                return 100
            else:
                return 0
        except ValueError:
            return "Error: Something unexpected happened."
    elif test_case == "subtracting":
        try:
            if user_submission == 10:
                return 100
            else:
                return 0
        except ValueError:
            return "Error: Something unexpected happened."
    elif test_case == "averaging":
        try:
            if user_submission == 2:
                return 100
            else:
                return 0
        except ValueError:
            return "Error: Something unexpected happened."
    else:
        return "Invalid test case"

if __name__ == "__main__":
    input_string = input_func()
    test_case, user_submission = input_string.split(",")

    # Try converting the user submission to an integer, if it fails, return an error
    try:
        user_submission = int(user_submission)
    except ValueError:
        print("Error: Invalid type. Expected an integer.")
        sys.exit(0)

    result = evaluate_test_case(test_case, user_submission)
    print(result)
