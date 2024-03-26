import sys


def a_star(givenMaze):
    def manhattan_distance(node, ending_node):
        x = abs(node[0] - ending_node[0])
        y = abs(node[1] - ending_node[1])
        return x+y
    # creating node class
    class Node():
        def __init__(self, state, parent, action, dist_from_start):
            self.state = state
            self.parent = parent
            self.action = action
            self.dist_from_start = dist_from_start
 
    # creating the frontier class for greedy best search

    class A_star():
        def __init__(self) -> None:
            self.frontier = []

        def add_child_node(self, node) -> None:
            self.frontier.append(node)

        def is_empty(self) -> bool:
            return len(self.frontier) == 0

        def state_in_frontier(self, state) -> bool:
            if any([node.state == state for node in self.frontier]):
                return True
            return False


        def remove_parent_node(self, ending_node):
            manhattan_distances = [manhattan_distance(node.state, ending_node) for node in self.frontier]
            distances_from_start = [node.dist_from_start for node in self.frontier]
            min_sum_of_dists = min([manhattan_distances[index] + distances_from_start[index] for index in range(len(manhattan_distances))])
            removed_node = [node for node in self.frontier if (manhattan_distance(node.state, ending_node) + node.dist_from_start) == min_sum_of_dists][0]
            self.frontier.remove(removed_node)
            return removed_node


    class Maze():
        def __init__(self): 
            maze = givenMaze
            # checking for more than one starting or ending points
            if maze.count("S") > 1: 
                raise Exception("There should be only one Starting Point")
            if maze.count("F") > 1:
                raise Exception("There should be only one Ending Point")
            # splitting the maze into lines
            # maze = maze.split("\n")[1:-1]
            maze = maze.splitlines()
            # getting the height and width of the maze
            self.height = len(maze)
            self.breadth = max([len(row) for row in maze])
            # keeping records of the walls
            self.walls = []
            # True for walls, rest everything False
            for i in range(self.height):
                row = []
                for j in range(self.breadth):
                    try:
                        if maze[i][j] == "S":
                            self.starting_point = (i,j)
                            row.append(False)
                        elif maze[i][j] == "F":
                            self.ending_point = (i,j)
                            row.append(False)
                        elif maze[i][j] == "0":
                            row.append(False)
                        else:
                            row.append(True)
                    except IndexError:
                        row.append(False)
                self.walls.append(row)

            # initializing the solution to None
            self.solution = None

        def print_maze(self) -> str:
            solution = self.solution[1] if self.solution is not None else None
            print()
            for i, row in enumerate(self.walls):
                for j, col in enumerate(row):
                    if col:
                        print("1", end="")
                    elif (i, j) == self.starting_point:
                        print("S", end="")
                    elif (i, j) == self.ending_point:
                        print("F", end="")
                    elif solution is not None and (i, j) in solution:
                        print("*", end="")
                    else:
                        print("0", end="")
                print()
            print()

        # finding the neighboring nodes of the parent node
        def neighboring_nodes(self, state) -> list:
            row, column = state
            neightbour_nodes = [
                ("down", (row+1, column)),
                ("up", (row-1, column)),
                ("right", (row, column+1)),
                ("left", (row, column-1))
            ]
            # checking if the neighbouring nodes are inside the maze and whether the nodes are free or walls    
            resulting_nodes = []
            for action, (row, column) in neightbour_nodes:
                if (0 <= row < self.height) and (0 <= column < self.breadth) and (self.walls[row][column] == False):
                    resulting_nodes.append((action, (row, column)))
            return resulting_nodes

        def solve_maze(self):
            # step counter
            self.states_explored = 0
            self.all_nodes = []
            # creating the first node and frontier
            start_node = Node(state = self.starting_point, parent= None, action= None, dist_from_start=0)
            frontier = A_star()            
            frontier.add_child_node(start_node)
            self.all_nodes.append(start_node)
            self.explored_nodes = set()
            while True:
                # removing the parent node from the frontier
                if frontier.is_empty():
                    raise Exception("No Solution")
                parent_node = frontier.remove_parent_node(self.ending_point)
                self.states_explored += 1
                # checking if the end node is reached
                if parent_node.state == self.ending_point:
                    actions_taken = []
                    passing_nodes = []
                    while parent_node.parent != None:
                        actions_taken.append(parent_node.action)
                        passing_nodes.append(parent_node.state)
                        parent_node = parent_node.parent
                    actions_taken.reverse()
                    passing_nodes.reverse()
                    self.solution = (actions_taken, passing_nodes)
                    self.path_length = len(actions_taken)
                    return 
                # marking the node as explored 
                self.explored_nodes.add(parent_node.state)
                # adding the neightboring nodes to frontier if not already present
                for action, state in self.neighboring_nodes(parent_node.state):
                    if (frontier.state_in_frontier(state) == False) and (state not in self.explored_nodes):
                        child_node = Node(state = state, parent = parent_node, action = action, dist_from_start= (parent_node.dist_from_start+1))
                        frontier.add_child_node(child_node)
                        self.all_nodes.append(child_node)
    maze = Maze()
    maze.solve_maze()
    return maze.solution[1]